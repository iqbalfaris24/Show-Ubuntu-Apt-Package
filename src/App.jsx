/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

function App() {
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/packages")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setPackages(data.packages);
                // setLoading(false);
            })
            .catch((error) => {
                setError(error);
                // setLoading(false);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPackages = packages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div>
                <h1>Daftar Paket Terinstal</h1>
                <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <table>
                    <thead>
                        <tr>
                            <th>Nama Paket</th>
                            <th>Versi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPackages.map((pkg) => (
                            <tr key={pkg.name}>
                                <td>{pkg.name}</td>
                                <td>{pkg.version}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
