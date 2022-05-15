import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, MoneyCollectOutlined, HomeOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const Navbar = () => {
    
    return (
        <div>
           <Menu theme='dark'>
                <Menu.Item key={1} icon={<HomeOutlined/>}>
                <Link to={'/'}> Home </Link>
                </Menu.Item>
                <Menu.Item key={2} icon={<DashboardOutlined/>}>
                <Link to={'/cryptocurrencies'}> Cryptocurrencies </Link>
                </Menu.Item>
                <Menu.Item key={3} icon={<MoneyCollectOutlined/>}>
                <Link to={'/exchanges'}>Exchange</Link>
                </Menu.Item>
                <Menu.Item key={4} icon={<FileSearchOutlined/>}>
                <Link to={'/news'}> News </Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default Navbar;
