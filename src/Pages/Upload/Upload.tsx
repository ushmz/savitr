import { MDBBtn, MDBIcon, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

export const Upload: React.FC = () => {
  const history = useHistory();
  const [uploaded, setUploaded] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      return setUploaded([...uploaded, ...acceptedFiles]);
    },
    [uploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop, multiple: false });

  const removeFile = (file: File) => () => {
    const newFiles = [...uploaded];
    newFiles.splice(newFiles.indexOf(file), 1);
    setUploaded(newFiles);
  };

  const removeAll = () => {
    setUploaded([]);
  };

  const handleFileChange = (e: any) => {
    const target = e.target as HTMLInputElement;

    if (target.files == null) return;
    const file = target.files.item(0);
    if (file) {
      // updateFile(this.props.dispatch, file);
	} else {return}
  }

  // eslint-disable-next-line react/jsx-key
  const files = uploaded.map((file, idx) => {
    return (
      <div key={idx} className="border border-dark rounded-lg mx-3 my-1 px-3">
        <MDBRow>
          {/* <MDBProgress value={0} className="my-2" /> */}
          <MDBCol md="10">
            <div className="d-flex flex-row">
              <input className="my-1" id={`fileInput${idx}`} defaultValue={file.name} />
              <p className="my-1">{`(${file.size} bytes)`}</p>
            </div>
          </MDBCol>
          <MDBCol md="2">
            <span className="float-right">
              <MDBIcon icon="times-circle" onClick={removeFile(file)} />
            </span>
          </MDBCol>
        </MDBRow>
      </div>
    );
  });

  return (
    <MDBContainer>
      <p>User Home</p>
      <p>実験協力ありがとうございます。こちらから履歴情報のアップロードを行ってください。</p>
      <p>いただいた履歴情報は研究目的以外の用途で使用することはありません。</p>
	  <form method="post" action="/upload">

      <MDBRow className="border border-dark rounded-lg p-3">
        {files.length !== 0 ? <div style={{ width: '100%' }}>{files}</div> : <></>}
        {/* <div className="input-group-prepend">
              <span className="input-group-text">ファイルを選択</span>
            </div> */}
        <div {...getRootProps({ className: 'custom-file my-3' })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="custom-file-label">ここにファイルをドラッグ&ドロップ。</p>
          ) : (
            <p className="custom-file-label">ファイルを選択するか、ドラッグ&ドロップしてください。</p>
          )}
        </div>
      </MDBRow>
      <MDBRow className="my-3">
        <MDBBtn color="secondary" onClick={() => history.push('/user/rabhareit')}>
          戻る
        </MDBBtn>
        <MDBBtn color="primary" type="submit" onClick={() => history.push('/upload/done')}>
          アップロードする
        </MDBBtn>
      </MDBRow>

	  </form>
    </MDBContainer>
  );
};
