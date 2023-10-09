document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let productName = document.getElementById('productName').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    const data = {
        productName: productName,
        description: description,
        price: price,
        quantity: quantity
    }
    try {
        const result = await axios.post('/post-data', { data }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.data.message == 'success') {
            alert('Product Added Successfully')
            window.location.href = '/';
        }
        else {
            alert('Something went wrong')
        }
    } catch (error) {
        console.log(error)
        alert('Something went wrong')
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    fetchData();
})

function displayData(data) {
    tableBody.innerText = '';
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute('data-id', data[i].id);
        let td1 = document.createElement("td");
        td1.className = "td1";
        td1.setAttribute("attr", data["price"])
        td1.appendChild(document.createTextNode(data[i].name));
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.className = "td2";
        td2.appendChild(document.createTextNode(data[i].description));
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.className = "td3";
        td3.appendChild(document.createTextNode(data[i].price));
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.className = "td4";
        td4.appendChild(document.createTextNode(data[i].quantity));
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td1.className = "td4";
        var buy1 = document.createElement('button');
        buy1.className = "btn btn-info btn-sm float-right m-0 w-25";
        buy1.appendChild(document.createTextNode("Buy 1"));
        buy1.addEventListener('click', () => {
            updateQuantity(1, data[i].id)
        })

        var buy2 = document.createElement('button');
        buy2.className = "btn mr-1 btn-info btn-sm float-right ms-2 w-25";
        buy2.appendChild(document.createTextNode("Buy 2"));
        buy2.addEventListener('click', () => {
            updateQuantity(2, data[i].id)
        })

        var buy3 = document.createElement('button');
        buy3.className = "btn mr-1 btn-info btn-sm float-right ms-2 w-25";
        buy3.appendChild(document.createTextNode("Buy 3"));
        buy3.addEventListener('click', () => {
            updateQuantity(3, data[i].id)
        })

        td5.appendChild(buy1)
        td5.appendChild(buy2)
        td5.appendChild(buy3)
        tr.appendChild(td5)
        tableBody.appendChild(tr);
    }
}

async function updateQuantity(value, id) {
    const values = {
        id: id,
        value: value
    }
    try {
        await axios.post('/update-data', { values }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        fetchData();
    } catch (error) {
        console.log(error)
    }
}

async function fetchData() {
    try {
        const result = await axios.get('/get-data')
        displayData(result.data);
    } catch (error) {
        console.log(error)
    }
}