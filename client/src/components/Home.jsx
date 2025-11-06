
import useSessionExpiry from './useSessionExpiry';

function Home() {
    useSessionExpiry();

    return (
        <div className="home-container">
       
            <h1 style={{ "marginBottom": "200px" }}>IDFC BANK</h1>

            <div className="home-features">
                <div className="feature-card">
                    <h3>Secure & Fast</h3>
                    <p>Apply for loans with end-to-end encryption and quick processing.</p>
                </div>
                <div className="feature-card">
                    <h3>Flexible Options</h3>
                    <p>Choose from educational, agricultural, or business loans with customizable terms.</p>
                </div>

            </div>
        </div>
    );
}

export default Home;