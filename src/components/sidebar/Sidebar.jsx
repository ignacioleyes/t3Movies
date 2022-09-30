import Cookies from 'js-cookie';
import React, {useEffect} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// PackageJson
import packageJson from '../../../package.json';

// Assets
import Movies from '../../assets/svg/movie.jsx';
import Hamburguer from '../../assets/svg/hamburger.jsx';
import Logout from '../../assets/svg/logout.jsx';

// I18n
import esi18n from '../../i18n/es.json';

const Sidebar = ({ collapsed, rtl, toggled, handleToggleSidebar, handleCollapsedChange }) => {
  const history = useHistory();
  JSON.parse(Cookies.get('auth'));




  // ------------------------------------------- //
  // ---------- Side Effects Handlers ---------- //
  // ------------------------------------------- //

  useEffect(() => {
    window.addEventListener('resize', (window) => {
      if (window.target.outerWidth < 1400) {
        handleCollapsedChange(true);
      }
    });
  }, []);

  // ------------------------------------------- //
  // -------------- Action Handlers ------------ //
  // ------------------------------------------- //

  const onChangeView = (href, process) => {
    try {
      history.push({
        pathname: href,
        state: process,
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const logoutHandler = () => {
    Cookies.remove('auth');
    history.push('/auth');
  };

  // ------------------------------------------- //
  // ---------------- Components --------------- //
  // ------------------------------------------- //

  const contentAdmin = () => {
    return (
      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu title={esi18n.sidebar.movies} icon={<Movies />}>
            <MenuItem onClick={() => onChangeView('/addMovie')}>{esi18n.sidebar.addMovie}</MenuItem>
            <hr className="hr-sidebar" />
            <MenuItem onClick={() => onChangeView('/adminMovies')}>{esi18n.sidebar.adminMovies}</MenuItem>
          </SubMenu>
        </Menu>
      </SidebarContent>
    );
  };

  // ------------------------------------------- //
  // ----------------- Return ------------------ //
  // ------------------------------------------- //

  return (
    <ProSidebar rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div className="container">
          <div className="row col-xl-12 px-2 mt-3 mb-5">
            <div className="container text-nowrap">
              <div className="row" onClick={() => handleCollapsedChange(!collapsed)}>
                <div className="col-12 mt-2">
                  <Hamburguer marginBottom="11.5rem" />
                  <label className="sidebar-title">{esi18n.sidebar.title}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      {contentAdmin()}

      <SidebarFooter>
        <div className="row logout">
          <div className="col-xl-12">
            <div className="container-fluid px-3 ms-1">
              <div className="row text-nowrap" onClick={logoutHandler}>
                <div className="col-12">
                  <Logout />
                  <label className="px-2 sidebar-user-label logout">{esi18n.sidebar.footerLogout}</label>
                </div>
              </div>
              <div className="row mt-1 text-end mb-3 sidebar-version">
                <label>
                  {esi18n.sidebar.footerVersion} {packageJson.version}
                </label>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;