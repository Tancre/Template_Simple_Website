class Header extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <header>
            <h1><a href="#">Sample Custom Element</a></h1>
            <nav>
                <li><a href="#">a</a></li>
                <li><a href="#">b</a></li>
                <li><a href="#">c</a></li>
            </nav>
        </header>        `
    }
} 

export default Header;