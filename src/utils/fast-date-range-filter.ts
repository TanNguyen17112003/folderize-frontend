export const fastDateRangeFilter = [
  {
    label: 'Hôm nay',
    value: {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(23, 59, 59, 999))
    }
  },
  {
    label: 'Hôm qua',
    value: {
      startDate: new Date(
        new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0)
      ),
      endDate: new Date(new Date().setHours(23, 59, 59, 999))
    }
  },
  {
    label: '7 ngày gần nhất',
    value: {
      startDate: new Date(
        new Date(new Date().setDate(new Date().getDate() - 7)).setHours(0, 0, 0, 0)
      ),
      endDate: new Date(new Date().setHours(23, 59, 59, 999))
    }
  },
  {
    label: '30 ngày gần nhất',
    value: {
      startDate: new Date(
        new Date(new Date().setDate(new Date().getDate() - 30)).setHours(0, 0, 0, 0)
      ),
      endDate: new Date(new Date().setHours(23, 59, 59, 999))
    }
  },
  {
    label: 'Tháng trước',
    value: {
      startDate: new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0)
      ),
      endDate: new Date(
        new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(23, 59, 59, 999)
      )
    }
  }
];

export interface DateRangeProps {
  startDate: Date | null;
  endDate: Date | null;
}

export const initialDateRange: DateRangeProps = {
  startDate: null,
  endDate: null
};
