import React, { Component } from "react";
import { Modal } from "bootstrap";
import Card from "../Components/Card"
import Navbar from "../Components/Navbar"

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            buku: [
                { isbn: "9786020332956", judul: "Bumi", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 103000, cover: "https://drive.google.com/uc?id=1DIW8qvYb9AvK7g8WiqLjSgupnP418ZN0" },
                { isbn: "9786020332949", judul: "Bulan", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 95000, cover: "https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg" },
                { isbn: "9786020351179", judul: "Bintang", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 88000, cover: "https://drive.google.com/uc?id=1e-thvq7lkG1_gw0FqHzRoiAhfhdgpOUj" },
                { isbn: "9786020383590", judul: "Hujan", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 89000, cover: "https://drive.google.com/uc?id=1BH9hsP0yEDYMliPWbUe2dVm2Zj0DIlAT" },
                { isbn: "9786020385938", judul: "Komet", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 95000, cover: "https://drive.google.com/uc?id=1UXa5oJm5SWNX9p2JrPRjdwOcxaqmP3Xs" },
                { isbn: "9786020332116", judul: "Matahari", penulis: "Tere Liye", penerbit: "PT. Gramedia Pustaka Utama", harga: 95000, cover: "https://drive.google.com/uc?id=1fgW1LFZqqKUD33UygCv1GUwNgsvkCANh" },
            ],
            action: "",
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            cover: "",
            selectedItem: null,
            keyword: "",
            filterBuku: {}
        }
        this.state.filterBuku = this.state.buku
    }
    render() {
        return (
            <div>
                
                <div className="container">
                <h4 className="text-info my-2">
                    Nama Pengguna: { this.state.user }
                </h4>

                    <input type="text" className="form-control my-2" placeholder="Pencarian"
                        value={this.state.keyword}
                        onChange={ev => this.setState({ keyword: ev.target.value })}
                        onKeyUp={ev => this.searching(ev)}
                    />
                    
                    <div className="row">
                        {this.state.filterBuku.map((item, index) => (
                            <Card
                                judul={item.judul}
                                penulis={item.penulis}
                                penerbit={item.penerbit}
                                harga={item.harga}
                                cover={item.cover}
                                onCart={ () => this.addToCart(item)}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.Drop(item)} />
                        ))}
                    </div>

                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Data
                    </button>

                    <div className="modal" id="modal_buku">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    Form Buku
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.Save(ev)}>
                                        Judul Buku
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.judul}
                                            onChange={ev => this.setState({ judul: ev.target.value })}
                                            required />

                                        Penulis Buku
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.penulis}
                                            onChange={ev => this.setState({ penulis: ev.target.value })}
                                            required />

                                        Penerbit Buku
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.penerbit}
                                            onChange={ev => this.setState({ penerbit: ev.target.value })}
                                            required />

                                        Harga Buku
                                        <input type="number" className="form-control mb-2"
                                            value={this.state.harga}
                                            onChange={ev => this.setState({ harga: ev.target.value })}
                                            required />

                                        Cover Buku
                                        <input type="url" className="form-control mb-2"
                                            value={this.state.cover}
                                            onChange={ev => this.setState({ cover: ev.target.value })}
                                            required />

                                        <button className="btn btn-info btn-block" type="submit">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
    componentDidMount() {
        this.ok = new Modal(document.getElementById("modal_buku"))
    }
    Add = () => {
        this.ok.show();
        this.setState({
            isbn: Math.random(1, 10000000),
            judul: "",
            penulis: "",
            penerbit: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }
    Edit = (item) => {
        this.ok.show();
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        let tempBuku = this.state.buku
        if (this.state.action === "insert") {
            tempBuku.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                penulis: this.state.penulis,
                penerbit: this.state.penerbit,
                cover: this.state.cover,
                harga: this.state.harga,
            })
        } else if (this.state.action === "update") {
            let index = tempBuku.indexOf(this.state.selectedItem)
            tempBuku[index].isbn = this.state.isbn
            tempBuku[index].judul = this.state.judul
            tempBuku[index].penulis = this.state.penulis
            tempBuku[index].penerbit = this.state.penerbit
            tempBuku[index].cover = this.state.cover
            tempBuku[index].harga = this.state.harga``
        }
        this.setState({ buku: tempBuku })
        this.ok.hide();
    }
    Drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let tempBuku = this.state.buku
            let index = tempBuku.indexOf(item)
            tempBuku.splice(index, 1)
            this.setState({ buku: tempBuku })
        }
    }
    searching = event => {
        if (event.keyCode === 13) {

            let keyword = this.state.keyword.toLowerCase()
            let tempBuku = this.state.buku
            let result = tempBuku.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
            })

            this.setState({ filterBuku: result })
        }
    }
    setUser = () =>{
        //cek estitensi dari session storage
        if (localStorage.getItem("user") === null) {
            //kondisi jika session storage "user" belum dibuat
            let prompt = window.prompt("Masukkan Nama Anda","")
            if (prompt === null || prompt === "") {
                //jika user tidak mengisikan namanya
                this.setUser()
            }else{
                //jika user telah mengisi namanya

                //simpan nama user ke session storage
                localStorage.setItem("user",prompt)

                //simpan nmaa user ke state.user
                this.setState({user:prompt})
            }
            
        }else{
            //kondisi saat session storage "user" telah dibuat

            //akses nilai dari session storage "user"
            let name = localStorage.getItem("user")
            this.setState({user:name})
        }
    }
    componentDidMount(){
        this.setUser()
}
addToCart = (selectedItem) => {
    // membuat sebuah variabel untuk menampung cart sementara
    let tempCart = []


    // cek eksistensi dari data cart pada localStorage
    if(localStorage.getItem("cart") !== null){
        tempCart = JSON.parse(localStorage.getItem("cart"))
        // JSON.parse() digunakan untuk mengonversi dari string -> array object
    }


    // cek data yang dipilih user ke keranjang belanja
    let existItem = tempCart.find(item => item.isbn === selectedItem.isbn)


    if(existItem){
        // jika item yang dipilih ada pada keranjang belanja
        window.alert("Anda telah memilih item ini")
    }else{
        // user diminta memasukkan jumlah item yang dibeli
        let promptJumlah = window.prompt("Masukkan jumlah item yang beli","")
        if(promptJumlah !== null && promptJumlah !== ""){
            // jika user memasukkan jumlah item yg dibeli


            // menambahkan properti "jumlahBeli" pada item yang dipilih
            selectedItem.jumlahBeli = promptJumlah
            
            // masukkan item yg dipilih ke dalam cart
            tempCart.push(selectedItem)


            // simpan array tempCart ke localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
    }
}


}
export default Gallery;