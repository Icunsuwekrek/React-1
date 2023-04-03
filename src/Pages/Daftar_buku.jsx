import React, { Component } from "react"
import axios from 'axios'
import { Modal } from 'bootstrap'

class Daftar_buku extends Component {
    constructor() {
        super();
        this.state = {
            buku: [],
            isbn: "",
            title: "",
            author: "",
            publisher: "",
            category: "",
            stock: 0,
            aksi: "",
            search: "",

        }
    }
    getbuku() {
        axios.get("http://localhost:8000/book")
            .then(response => {
                this.setState({
                    buku: response.data.data
                })
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }
    componentDidMount() {
        this.getbuku()
        this.modalshow = new Modal(document.getElementById("modal"))
    }
    Add = () => {
        this.modalshow.show();
        this.setState({
            isbn: "",
            judul: "",
            penulis: "",
            penerbit: "",
            harga: "",
            cover: "",
            action: "insert"
        });

    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    onFileChange = event => {
        // Update the state
        this.setState({ cover: event.target.files[0] });
    };
    Save = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("isbn", this.state.isbn);
        formData.append("judul", this.state.judul)
        formData.append("penulis", this.state.penulis)
        formData.append("penerbit", this.state.penerbit)
        formData.append("harga", this.state.harga)

        if (this.state.cover != "") {
            formData.append("cover", this.state.cover, this.state.cover.name);
        }
        let url = "";
        if (this.state.action === "insert") {
            url = "http://localhost:8000/book/insertbook"
            const formData = new FormData();
            formData.append("isbn", this.state.isbn);
            formData.append("judul", this.state.judul)
            formData.append("penulis", this.state.penulis)
            formData.append("penerbit", this.state.penerbit)
            formData.append("harga", this.state.harga)
            if (this.state.cover != "") {
                formData.append("cover", this.state.cover, this.state.cover.name);
            }
            axios.post(url, formData)
                .then(response => {
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    this.getbuku();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal insert');
                });
        } else {
            url = "http://localhost:8000/book/updatebook/" + this.state.isbn
            const formData = new FormData();
            formData.append("isbn", this.state.isbn);
            formData.append("judul", this.state.judul)
            formData.append("penulis", this.state.penulis)
            formData.append("penerbit", this.state.penerbit)
            formData.append("harga", this.state.harga)
            if (this.state.cover != "") {
                formData.append("cover", this.state.cover, this.state.cover.name);
            }
            axios.put(url, formData)
                .then(response => {
                    // jika proses simpan berhasil, memanggil data yang terbaru
                    this.getbuku();
                })
                .catch(error => {
                    console.log(error);
                    alert('gagal update');
                });
        }

        // menutup form modal
        this.modalshow.hide();
    }
    Edit = (item) => {
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            harga: item.harga,
            action: "update"
        });
        this.modalshow.show()
    }
    findbuku = (event) => {
        let url = "http://localhost:8000/book/search";
        if (event.keyCode === 13) {
            // menampung data keyword pencarian
            let form = {
                find: this.state.search
            }
            // mengakses api untuk mengambil data pegawai
            // berdasarkan keyword
            axios.post(url, form)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.setState({ buku: response.data.buku });
                    console.log(response)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin?")) {
            let url = "http://localhost:8000/book/dropbook/" + id;
            axios.delete(url)
                .then(response => {
                    // mengisikan data dari respon API ke array pegawai
                    this.getbuku()
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div>
            
                <div className="container">
                    <div className="alert alert-primary">
                        <h3>Daftar Buku</h3>
                        <input type="text" className="form-control mb-2" name="search" value={this.state.search}
                            onChange={this.bind} onKeyUp={this.findbuku} placeholder="Pencarian..." />
                        {/* tampilan tabel pegawai */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Judul</th>
                                    <th>Penulis</th>
                                    <th>Penerbit</th>
                                    <th>Kategori</th>
                                    <th>Stock</th>
                                    <th>Harga</th>
                                    <th>Cover</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.buku.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.isbn}</td>
                                            <td>{item.title}</td>
                                            <td>{item.author}</td>
                                            <td>{item.publisher}</td>
                                            <td>{item.category}</td>
                                            <td>{item.stock}</td>
                                            <td><img src={"http://localhost:8000/cover/" + item.cover} width="80" />{item.cover}</td>
                                            <td>
                                                <button className="btn btn-sm btn-info m-1" data-toggle="modal"
                                                    data-target="#modal" onClick={() => this.Edit(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.isbn)}>
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={this.Add}
                            data-toggle="modal">
                            Tambah Data
                        </button>
                        {/* modal form buku */}
                        <div className="modal fade" id="modal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        Form Buku
                                    </div>
                                    <form onSubmit={this.Save}>
                                        <div className="modal-body">
                                            ISBN
                                            <input type="number" name="isbn" value={this.state.isbn} onChange={this.bind}
                                                className="form-control" required />
                                            Judul
                                            <input type="text" name="judul" value={this.state.judul} onChange={this.bind}
                                                className="form-control" required />
                                            Penulis
                                            <input type="text" name="penulis" value={this.state.penulis} onChange={this.bind}
                                                className="form-control" required />
                                            Penerbit
                                            <input type="text" name="penerbit" value={this.state.penerbit} onChange={this.bind}
                                                className="form-control" required />
                                            Harga
                                            <input type="number" name="harga" value={this.state.harga} onChange={this.bind}
                                                className="form-control" required />
                                            Cover
                                            <input type="file" name="cover" onChange={this.onFileChange}
                                                className="form-control" />
                                        </div>
                                        <div className="modal-footer">
                                            <button className="btn btn-sm btn-success" type="submit">
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Daftar_buku;
