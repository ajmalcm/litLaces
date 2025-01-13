import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
// import Logo from "@/public/icons/lit_laces.png";
import Logo from "@/public/icons/loog.png";
import CloseIcon from "@/public/icons/close.svg";
import Image from 'next/image';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

const SideNav = ({open,toggleDrawer}:{open:boolean,toggleDrawer:Function}) => {

    const navLinks=[{item:"Home",link:"/"},{item:"Shop Men",link:"/collections/ShopMen"},{item:"Shop Women",link:"/collections/ShopWomen"},{item:"Shop All",link:"/collections/ShopAll"}];

    const DrawerList = (
        <Box sx={{ width: {xs:"100vw",sm:400},display:"flex",flexDirection:"column",justifyContent:"space-between",backgroundColor:"#eaeaea",height:'100vh' }} role="presentation" onClick={toggleDrawer(false)}>
        <div className='flex justify-start items-center p-6 md:p-8 bg-[#0a0a0a] cursor-pointer'>
          <Image src={CloseIcon} alt="closeIcon"/>
          </div>
          <List className='-mt-[40vh] px-8 text-lg'>
            {navLinks.map((text, index) => (
              <ListItem key={text.item} disablePadding>
                <Link href={text.link}>
                <ListItemButton>  
                  <ListItemText primary={text.item} />
                </ListItemButton>
              </Link>
              </ListItem>
            ))}
          </List>
          <div className='flex justify-between items-center px-8 bg-[#0a0a0a] cursor-pointer'>
          <Image src={Logo} alt="logo" width={70} height={70}/>
           <InstagramIcon style={{color:'white'}} fontSize='large'/>
          </div>
        </Box>
      );

  return (
    <div>
        <Drawer open={open} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default SideNav
