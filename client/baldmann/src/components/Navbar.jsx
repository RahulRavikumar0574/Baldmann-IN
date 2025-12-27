import React, { useState } from "react";
import ProjectSearch from "./ProjectSearch";
import SearchIcon from "./SearchIcon";
import './NavbarSearchResponsive.css';
import { HashLink } from "react-router-hash-link";
import './Navbar.css';
import logo from './logo-yellow-final.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="main-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="logo">
                <img src={logo} alt="BaldMann Logo" />
                <p className="company-name">BaldMann</p>
            </div>

            

            <div className={`menu-link ${isMobileMenuOpen ? "mobile-menu-link" : ""}`}>
                <ul>
                    <li>
                        <HashLink smooth to="/#hero" onClick={closeMobileMenu}>Home</HashLink>
                    </li>
                    <li>
                        <Link to="/learn" onClick={closeMobileMenu}>Learn</Link>
                    </li>
                    <li>
                        <Link to="/visionarium" onClick={closeMobileMenu}>Visionarium</Link>
                    </li>
                    <li>
                        <Link to="/services" onClick={closeMobileMenu}>Services</Link>
                    </li>
                    <li>
                    </li>
                    <li>
                        {/* <Link to="/baldsphere" onClick={closeMobileMenu}>BaldSphere</Link> */}
                    </li>
                    <li>
                        <HashLink smooth to="/#featured" onClick={closeMobileMenu}>Blogs</HashLink>
                    </li>
                    <li>
                        <Link to="https://baldmart.vercel.app/" onClick={closeMobileMenu}>Get Funded</Link>
                    </li>
                    <li>
                        <Link to="/team" onClick={closeMobileMenu}>Our Team</Link>
                    </li>
                </ul>
            </div>
            {/* Desktop search bar */}
            <div className="navbar-search-desktop" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <ProjectSearch />
            </div>

            {/* Mobile search icon */}
            <div className="navbar-search-mobile" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-label="Open search"
                    onClick={() => setShowMobileSearch(true)}
                >
                    <SearchIcon size={32} color="#fff" />
                </button>
            </div>

            {/* Mobile search modal */}
            {showMobileSearch && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.35)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onClick={() => setShowMobileSearch(false)}
                >
                    <div style={{ background: '#fff', borderRadius: 16, padding: 24, minWidth: 0, width: '90vw', maxWidth: 400 }} onClick={e => e.stopPropagation()}>
                        <ProjectSearch />
                        <button style={{ marginTop: 16, width: '100%', border: 'none', background: '#f7c948', borderRadius: 8, padding: 10, fontWeight: 600, fontSize: 16, cursor: 'pointer' }} onClick={() => setShowMobileSearch(false)}>Close</button>
                    </div>
                </div>
            )}
            <div
                className="hamburger-menu"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <GiHamburgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;
