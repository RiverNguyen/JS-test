const addProduct = () => {
    event.preventDefault(); //* ngăn chặn sự kiện mặc định của form
    const name = document.querySelector("input[name='name']").value;
    const price = document.querySelector("input[name='price']").value;
    const image = document.querySelector("input[name='image']").value;
    const danhmuc = document.querySelector("select[name='danhmuc']").value;
    if (name == "" || price == "" || image == "" || danhmuc == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            image: image,
            cat_id: danhmuc,
            price: price,
        }),
    });
    alert("Thêm sản phẩm thành công");
};

const renderProducts = async () => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    const response = await fetch("http://localhost:3000/products");
    const product = await response.json();

    product.map((a, b) => {
        const tr = document.createElement("tr");
        tr.innerHTML = /* html */ `
            <td>${b + 1}</td>
            <td>${a.name}</td>
            <td>
                <img src="${a.image}" width="100px" height="100px" />
            </td>
            <td>${a.cat_id}</td>
            <td>${a.price}</td>
            <td>
                <button class="btn btn-danger" onclick="delProduct('${
                    a.id
                }')">Xóa</button>
                <a href="./product-edit.html?id=${
                    a.id
                }" class="btn btn-primary">Sửa</a>
            </td>

        `;
        tbody.appendChild(tr);
    });
};

const delProduct = (id) => {
    const conf = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (conf) {
        fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });
        alert("Xoá sản phẩm thành công");
    }
};

renderProducts();
