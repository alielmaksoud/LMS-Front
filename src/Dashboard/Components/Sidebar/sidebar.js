import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse';
import { Link} from 'react-router-dom';
import { IoIosArrowDropdown } from "react-icons/io";
import { BiHomeAlt, BiFile } from 'react-icons/bi';




function SidebarItem({ label,path, items, depthStep = 20, depth = 1, ...rest }) {

    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
        setOpen(!open);
    };
 
    return (
      <>
        <ListItem button dense {...rest}>
          <Link className="Link" to={path} button onClick={handleClick} style={{ paddingLeft: depth * depthStep }}>
            {Array.isArray(items) ? (
          <IoIosArrowDropdown/>
          ) : label === 'Home' ? (<BiHomeAlt/> ) : (<BiFile/>)}
              {label}
          </Link>
        </ListItem>
        {Array.isArray(items) ? (
          <List disablePadding dense>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {items.map((subItem) => (
              <SidebarItem
                key={subItem.name}
                depth={depth + 1}
                depthStep={depthStep}
                {...subItem}
                onClick={() => rest.CheckSidebar()}
              />
            ))}
           </Collapse>
          </List>
        ) : null}

      </>
    )
  }
  //
  function Sidebar({isVisible, forwardedRef, CheckSidebar, items, depthStep, depth, state }) {

    return (
      <div className={ isVisible ? 'nav-menu' : 'nav-menu active'} ref={forwardedRef}>
        <List disablePadding dense >
        <ListItem>
            <div className="space"></div>
        </ListItem>
          {items.map((sidebarItem, index) => (
            <SidebarItem
              key={`${sidebarItem.name}${index}`}
              depthStep={depthStep}
              depth={depth}
              {...sidebarItem}
              CheckSidebar={CheckSidebar}
            />
          ))}
        </List>
      </div>
    )
  }
  
  

export default Sidebar;