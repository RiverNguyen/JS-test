const getInfoProduct = async () => {
    const param = new URLSearchParams(window.location.search);
    const productId = param.get("id");
    const response = await fetch("http://localhost:3000/products/" + productId);
    const product = await response.json();

    id = document.querySelector("input[name='id']").value = product.id;
    name = document.querySelector("input[name='name']").value = product.name;
    price = document.querySelector("input[name='price']").value = product.price;
    image = document.querySelector("input[name='image']").value = product.image;
    danhmuc = document.querySelector("select[name='danhmuc']").value =
        product.cat_id;
    console.log(product);
};

const updateProduct = () => {
    event.preventDefault();
    const id = document.querySelector("input[name='id']").value;
    const name = document.querySelector("input[name='name']").value;
    const price = document.querySelector("input[name='price']").value;
    const image = document.querySelector("input[name='image']").value;
    const danhmuc = document.querySelector("select[name='danhmuc']").value;

    if (name == "" || price == "" || image == "" || danhmuc == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            name: name,
            image: image,
            cat_id: danhmuc,
            price: price,
        }),
    });
    window.location.href = "./index.html";
    alert("Cập nhật sản phẩm thành công");
};

getInfoProduct();
