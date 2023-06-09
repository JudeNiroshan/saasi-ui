import React from 'react';
import {
    Brand,
    Dropdown,
    DropdownGroup,
    DropdownItem,
    DropdownToggle,
    Flex,
    FlexItem,
    Masthead,
    MastheadBrand,
    MastheadContent,
    MastheadMain,
    MastheadToggle,
    Nav,
    NavItem,
    NavList,
    Page, PageSection,
    PageSidebar,
    PageToggleButton,
    Stack,
    StackItem,
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
import {Outlet, useNavigate} from 'react-router';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import {Exporter} from "./Exporter/Exporter";
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
import logo from '../images/Logo-Red_Hat.png'
import icon from '../images/Logo-Red-Hat-icon.png'
import {UserContext} from "../hooks/useUser";
import './ParentPage.css'
import {NewExporter} from "./Exporter/NewExporter";

export const ParentPage: React.FunctionComponent = () => {
    const {user, setUser} = React.useContext(UserContext);
    const [renderingComponent, setRenderingComponent] = React.useState(<Exporter/>);
    const [isNavOpen, setIsNavOpen] = React.useState(true);
    const [activeItem, setActiveItem] = React.useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const navigate = useNavigate()

    React.useEffect(() => {
        if (user === undefined) {
            navigate('/login')
        }
    }, [user, navigate])

    const onNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    const userDropdownItems = [
        <DropdownGroup key="group 2">
            <DropdownItem key="group 2 profile">My profile</DropdownItem>
            <DropdownItem key="group 2 user" component="button">
                User management
            </DropdownItem>
            <DropdownItem key="group 2 logout" onClick={() => {
                setUser(undefined)
            }}>Logout</DropdownItem>
        </DropdownGroup>
    ];

    const onDropdownToggle = (isDropdownOpen: boolean) => {
        setIsDropdownOpen(isDropdownOpen)
    };

    const onDropdownSelect = () => {
        setIsDropdownOpen(!isDropdownOpen)
    };

    const headerToolbar = (
        <Toolbar id="group-section-toolbar">
            <ToolbarContent>
                <ToolbarItem>SaaS Installer</ToolbarItem>
                <ToolbarGroup alignment={{default: 'alignRight'}}>
                    <ToolbarItem style={{marginRight: '0px'}}>
                        <img src={imgAvatar} alt="Avatar" className="avatar" style={{verticalAlign: 'middle'}}/>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Dropdown
                            isPlain
                            position="right"
                            onSelect={onDropdownSelect}
                            isOpen={isDropdownOpen}
                            toggle={<DropdownToggle onToggle={onDropdownToggle}>{user}</DropdownToggle>}
                            dropdownItems={userDropdownItems}
                        />
                    </ToolbarItem>
                </ToolbarGroup>
            </ToolbarContent>
        </Toolbar>
    );

    const header = (
        <Masthead>
            <MastheadToggle>
                <PageToggleButton
                    variant="plain"
                    aria-label="Global navigation"
                    isNavOpen={isNavOpen}
                    onNavToggle={onNavToggle}
                    id="group-section-nav-toggle"
                >
                    <BarsIcon/>
                </PageToggleButton>
            </MastheadToggle>
            <MastheadMain>
                <MastheadBrand href="https://redhat.com" target="_blank">
                    <Brand src={logo} alt="Red Hat logo" className="nav-logo"/>
                </MastheadBrand>
            </MastheadMain>
            <MastheadContent>{headerToolbar}</MastheadContent>
        </Masthead>
    );

    const PageNav = (
        <Nav onSelect={({itemId}) => setActiveItem(Number(itemId))} aria-label="Nav">
            <NavList>
                <NavItem itemId={0} isActive={activeItem === 0} onClick={() =>navigate("/")}>
                    Home
                </NavItem>
                <NavItem itemId={1} isActive={activeItem === 1} onClick={() =>navigate("/exporter")}>
                    Exporter
                </NavItem>
                <NavItem itemId={2} isActive={activeItem === 2} onClick={() =>navigate("/deployer")}>
                    Deployer
                </NavItem>
                <NavItem itemId={3} isActive={activeItem === 3} onClick={() =>navigate("/create-exporter")}>
                    Settings
                </NavItem>
                <NavItem itemId={4} isActive={activeItem === 4} to="#">
                    Documentation
                </NavItem>
            </NavList>
        </Nav>
    );

    const sidebar = <PageSidebar nav={PageNav} isNavOpen={isNavOpen} id="group-section-sidebar"/>;

    return (
        <Page header={header} sidebar={sidebar} style={{height: "100vh"}}>
            <Stack hasGutter >
                <StackItem isFilled={true}>
                    <PageSection>
                        <Outlet/>
                    </PageSection>
                </StackItem>
                <StackItem>
                    <footer className="footer pf-u-color-400">
                        <Flex alignItems={{default: 'alignItemsCenter'}}
                              justifyContent={{default: 'justifyContentCenter'}}>
                            <FlexItem>
                                <Brand src={icon} alt="Red Hat logo" className="icon"/>
                            </FlexItem>
                            <FlexItem>
                                &copy;2023 Red Hat
                            </FlexItem>
                            <FlexItem>
                                Provider information/Impressum
                            </FlexItem>
                            <FlexItem>
                                Privacy notice
                            </FlexItem>
                            <FlexItem>
                                Change cookie settings
                            </FlexItem>
                        </Flex>
                    </footer>
                </StackItem>
            </Stack>
        </Page>
    );
};
