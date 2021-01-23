import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';
import io from 'socket.io-client';

import "./styles.css";
import Logo from "../../assets/logo.svg";

import api from '../../service/api';

class Box extends Component {
    state = {
        box: {}
    }

    async componentDidMount() {
        this.subscribeToNewFiles();

        const boxId = this.props.match.params.id;
        const response = await api.get(`/boxes/${boxId}`);
        this.setState({box: response.data});
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;

        const socket = io('http://localhost:3333', {
            query: { user: box }
        });

        socket.on("file", data => {
            console.log("aaaaaaa");
            this.setState({
                box: {
                    ...this.state.box,
                    files: [data, ...this.state.box.files]
                }
            });
        });
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();

            const boxId = this.props.match.params.id;
            data.append('file', file);
            api.post(`boxes/${boxId}/files`, data);
        })
    }

    render() {
        return (
            <div id="box-container">
                <header>
                    <img src={Logo} alt="Logo"/>
                    <h1>{this.state.box.title}</h1>
                </header>

                <Dropzone onDrop={ this.handleUpload }>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()} className="upload">
                                <input {...getInputProps()} />
                                <p>Arraste arquivos ou clique aqui</p>
                            </div>
                        </section>
                    )}
                </Dropzone>

                <ul>
                    { this.state.box.files && this.state.box.files.map(file => (
                        <li key={file._id}>
                            <a className="fileInfo" href={file.url} target="_blank">
                                <MdInsertDriveFile size={24} color="#a5cfff" />
                                <strong>{file.title}</strong>
                            </a>
                            <span>há {formatDistance(new Date(), new Date(file.createdAt), {
                                locale: pt
                            })}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Box;