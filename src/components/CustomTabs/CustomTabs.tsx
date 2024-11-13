import { TabsProps } from '@radix-ui/react-tabs';
import type { FC, ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../shadcn/ui/tabs';

export interface TabOption {
  value: string;
  label: string;
  content?: ReactNode;
}

export interface CustomTabsProps extends TabsProps {
  options: TabOption[];
  tabsListClassName?: string;
}

const CustomTabs: FC<CustomTabsProps> = ({ options, tabsListClassName, ...props }) => {
  return (
    <Tabs defaultValue={options[0]?.value} {...props} className='w-full'>
      <TabsList className={tabsListClassName}>
        {options.map((option) => (
          <TabsTrigger key={option.value} value={option.value} className='w-full'>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {options.map((option) => (
        <TabsContent key={option.value} value={option.value} className='w-full'>
          {option.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
