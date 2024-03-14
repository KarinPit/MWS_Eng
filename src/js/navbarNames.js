export async function getGeneralData() {
    try {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/navigation-name");
        const { data } = await response.json();
        return {
            NavbarNames: data.attributes
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {}; // Return an empty object in case of error
    }
}