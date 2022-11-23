fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let cafeNames = data.cafes;

        fetch(
            "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json"
        )
            .then((response) => response.json())
            .then((placeData) => {
                let cafePlaces = placeData.places;

                let mergedData = cafeNames.map((item) => {
                    let otherData = cafePlaces.find(
                        (element) => element.id === item.location_id
                    );
                    return { ...item, ...otherData };
                });

                let tableBody = document.querySelector("tbody");
                let tableData = "";
                let i = 1;
                mergedData.map((value) => {
                    tableData += `<tr>
                <td class="column1"> ${i++} </td>
                <td class="column2">${value.name}</td>
                <td class="column3">
                    ${value.street_no} ${value.locality}
                </td>
                <td class="column4">${value.postal_code}</td>
                <td class="column5">${value.lat} </td>
                <td class="column6"> ${value.long}</td>
            </tr>`;
                });
                tableBody.innerHTML = tableData;
            });
    });
