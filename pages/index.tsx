import Image from "next/image";
import { Inter } from "next/font/google";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useState } from "react";

import MyExample from "../src/components/MyExample";
import MyExample2 from "../src/components/MyExample2";
import LineChart from "@/src/components/LineChart";
import AreaChartExample from "@/src/components/AreaChartExample";

const inter = Inter({ subsets: ["latin"] });


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];


export function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        test
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LineChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AreaChartExample />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <LineChart />
      </CustomTabPanel>
    </Box>
  );
}




export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <BasicTabs />
    </main>);
}
