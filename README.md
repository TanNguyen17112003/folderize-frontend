# Folderize frontend

# Giới thiệu

Front-end cho Ứng dụng Folderize, một hệ thống giúp quản lý tài liệu chính phủ và theo dõi phiên bản. Đây là những nền tảng sau để xây dựng giao diện người dùng cho hệ thống Folderize
* NextJs - version 14.1.0
* Material UI for creating component

# Cách chạy
- Clone repository và chạy lệnh ```yarn install``` để tải các dependencies cần thiết.
- Chạy lệnh ```yarn dev``` để chạy dự án và theo dõi trên ```localhost:3000 ```

# Cấu trúc thư mục

- __Folder public__: lưu những thứ không liên quan đến code và hỗ trợ trong việc deploy FE trên vercel. Khi muốn thêm ảnh vào hệ thống thì thêm vào folder: public > ui.
- __Folder src__ (đã được config sai khác so với dự án nextJs mặc định và phù hợp trong việc deploy). Bao gồm các folder với chức năng như sau:
    * __api__: Nơi định nghĩa các api tương ứng với các endpoint được định nghĩa ở backend. Các feature chính của hệ thống lần lượt được tổ chức thành các folder và trong từng folder sẽ có file index.ts để định nghĩa các hàm tương ứng với các endpoint. Sử dụng apiGet,         apiPut,...
  để hiện thực
  Đây là một ví dụ cho việc định nghĩa các hàm tương ứng với tính năng thông báo (Notification)
  
  ```typescript
  import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
  import { Notification, NotificationDetail } from 'src/types/notification';
  
  export interface NotificationFormProps
    extends Partial<
      Pick<
        Notification,
        'title' | 'content' | 'type' | 'userId' | 'reportId' | 'deliveryId' | 'orderId'
      >
    > {}
  
  export class NotificationsApi {
    static async getNotifications(request: {}): Promise<NotificationDetail[]> {
      return await apiGet('/notifications', getFormData(request));
    }
  
    static async sendNotification(request: NotificationFormProps): Promise<NotificationDetail> {
      const response = await apiPost('/notifications', request);
      return response;
    }
  
    static async updateNotificationStatus(id: Notification['id']): Promise<NotificationDetail> {
      const response = await apiPatch(`/notifications/${id}`, {});
      return response;
    }
  }

  ```

  * __components__: bao gôm các component thường xuyên được sử dụng (Chú ý vào 3 cái AutoComplete, CustomTable và FIleDropZone)
  * __contexts__: Quản lý state bằng context. Bao gồm các hàm cơ bản liên quan đến các hàm được định nghĩa trong thư mục api để cập nhật trạng thái của các biến một cách nhanh chóng mà không cần phải sử dụng một hàm callback giữa các component cha và con.
    Ví dụ về việc định nghĩa context của một feature chính:

    ```typescript
    import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
    import { NotificationsApi } from 'src/api/notifications';
    import useFunction, {
      DEFAULT_FUNCTION_RETURN,
      UseFunctionReturnType
    } from 'src/hooks/use-function';
    import { NotificationFormProps } from 'src/api/notifications';
    import { Notification, NotificationDetail } from 'src/types/notification';
    import { dateToUnixTimestamp } from 'src/utils/format-time-currency';
    
    interface ContextValue {
      getNotificationsApi: UseFunctionReturnType<FormData, NotificationDetail[]>;
      sendNotification: (request: Omit<Notification, 'id'>) => Promise<void>;
      updateNotificationStatus: (id: Notification['id']) => Promise<void>;
    }
    
    export const NotificationsContext = createContext<ContextValue>({
      getNotificationsApi: DEFAULT_FUNCTION_RETURN,
      sendNotification: async () => {},
      updateNotificationStatus: async () => {}
    });
    
    const NotificationsProvider = ({ children }: { children: ReactNode }) => {
      const getNotificationsApi = useFunction(NotificationsApi.getNotifications);
    
      const sendNotification = useCallback(
        async (request: Omit<NotificationDetail, 'id'>) => {
          try {
            const newNotification = await NotificationsApi.sendNotification(request);
            if (newNotification) {
              const newNotifications: NotificationDetail[] = [
                {
                  ...request,
                  id: newNotification.id
                },
                ...(getNotificationsApi.data || [])
              ];
              getNotificationsApi.setData(newNotifications);
            }
          } catch (error) {
            throw error;
          }
        },
        [getNotificationsApi]
      );
    
      const updateNotificationStatus = useCallback(
        async (id: Notification['id']) => {
          await NotificationsApi.updateNotificationStatus(id);
          getNotificationsApi.setData(
            (getNotificationsApi.data || []).map((c) =>
              c.id == id ? Object.assign(c, { isRead: true }) : c
            )
          );
        },
        [getNotificationsApi]
      );
    
      useEffect(() => {
        getNotificationsApi.call(new FormData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      return (
        <NotificationsContext.Provider
          value={{
            getNotificationsApi,
            sendNotification,
            updateNotificationStatus
          }}
        >
          {children}
        </NotificationsContext.Provider>
      );
    };
    
    export const useNotificationsContext = () => useContext(NotificationsContext);
    
    export default NotificationsProvider;

    ```

  * __hooks__: Bao gồm các hooks được định nghĩa sẵn để sử dụng trong dự án một cách thuận tiện hơn thay vì phải sử dụng lại các component và định nghĩa lại logic xử lý cho từng trường hợp. Quan tâm đến các hook sau: use-function, use-dialog, use-drawer.
    Ví dụ về việc sử dụng 2 hooks cơ bản: use-dialog và use-drawer:
    ```typescript
    import { Box } from '@mui/material';
    import React from 'react';
    import { CustomTable } from '@components';
    import getReportTableConfigs from './report-table-config';
    import { ReportDetail } from 'src/types/report';
    import ReportFilter from './report-filter';
    import usePagination from 'src/hooks/use-pagination';
    import { useDrawer } from '@hooks';
    import { useDialog } from '@hooks';
    import useOrdersData from 'src/hooks/use-orders-data';
    import ReportDetailEditDrawer from './report-detail-edit-drawer';
    import ReportDetailDeleteDialog from './report-detail-delete-dialog';
    import { formatUnixTimestamp } from 'src/utils/format-time-currency';
    import { useReportsContext } from 'src/contexts/reports/reports-context';
    
    interface ReportListProps {
      reports: ReportDetail[];
    }
    
    const ReportList: React.FC<ReportListProps> = ({ reports }) => {
      const statusList = ['Tất cả', 'Đã giải quyết', 'Đang chờ xử lý'];
      const { deleteReport } = useReportsContext();
    
      const editDetailReportDrawer = useDrawer<ReportDetail>();
      const removeDetailReportDialog = useDialog<ReportDetail>();
      const orders = useOrdersData();
    
      const [status, setStatus] = React.useState(statusList[0]);
      const [dateRange, setDateRange] = React.useState(() => {
        const now = new Date();
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(now.getDate() + 7);
        return {
          startDate: yesterday,
          endDate: oneWeekFromNow
        };
      });
    
      const reportTableConfig = React.useMemo(() => {
        return getReportTableConfigs({
          onClickEdit: (data: ReportDetail) => {
            editDetailReportDrawer.handleOpen(data);
          },
          onClickRemove: (data: ReportDetail) => {
            removeDetailReportDialog.handleOpen(data);
          },
          orders: orders.orders
        });
      }, [orders]);
    
      const pagination = usePagination({
        count: reports.length
      });
    
      const result = React.useMemo(() => {
        return reports.filter((report) => {
          const filterStatus =
            status === 'Tất cả'
              ? true
              : status === 'Đã giải quyết'
                ? report.status === 'REPLIED'
                : report.status === 'PENDING';
          const reportDate = formatUnixTimestamp(report.reportedAt!);
          const filterDate = dateRange.startDate <= reportDate && reportDate <= dateRange.endDate;
          return filterStatus && filterDate;
        });
      }, [status, dateRange, reports]);
    
      return (
        <Box className='flex flex-col min-h-screen bg-white px-6 py-4 text-black'>
          <ReportFilter
            statusList={statusList}
            numberOfReports={result.length}
            status={status}
            setStatus={setStatus}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <Box sx={{ flex: 1 }}>
            <CustomTable
              rows={result}
              configs={reportTableConfig}
              pagination={pagination}
              className='my-5 -mx-6'
            />
          </Box>
          <ReportDetailEditDrawer
            report={editDetailReportDrawer.data}
            open={editDetailReportDrawer.open}
            onClose={editDetailReportDrawer.handleClose}
          />
          <ReportDetailDeleteDialog
            report={removeDetailReportDialog.data!}
            open={removeDetailReportDialog.open}
            onClose={removeDetailReportDialog.handleClose}
            onConfirm={() => deleteReport(removeDetailReportDialog.data?.id as string)}
          />
        </Box>
      );
    };
    
    export default ReportList;
    ```
  * __pages__: ĐỊnh nghĩa các trang ứng với các feature chính của dự án. __Không code trực tiếp các component ở một trang ở đây__. (Code ở section). Ở từng folder trong folder pages sẽ có một file index.tsx. Ví dụ:
    ```typescript
    import { Layout as DashboardLayout } from 'src/layouts/dashboard';
    import type { Page as PageType } from 'src/types/page';
    import { useDialog, useFirebaseAuth, useAuth } from '@hooks';
    import React, { useCallback } from 'react';
    import NotificationsProvider from 'src/contexts/notifications/notifications-context';
    import useFunction from 'src/hooks/use-function';
    import NotificationsList from 'src/sections/notifications/notifications-list';
    import ContentHeader from 'src/components/content-header';
    import { Box } from '@mui/material';
    
    const Page: PageType = () => {
      const updateInformationDialog = useDialog();
      const { user: firebaseUser } = useFirebaseAuth();
      const { user } = useAuth();
    
      return (
        <Box>
          <ContentHeader title='Lịch sử thông báo' description='Danh sách thông báo của bạn' />
          <NotificationsList />
        </Box>
      );
    };
    
    Page.getLayout = (page) => (
      <DashboardLayout>
        <NotificationsProvider>{page}</NotificationsProvider>
      </DashboardLayout>
    );
    
    export default Page;
    ```
  * __sections__: ĐỊnh nghĩa các phần của một trang trong hệ thống.
  * __types__: Định nghĩa kiểu của các đối tượng trong hệ thống (interface, type)
  * __utils__: Bao gồm những hàm được sử dụng trong việc tối ưu hóa trang web, sử dụng cookie, jwt và các hàm xử lý liên quan đến thời gian.
