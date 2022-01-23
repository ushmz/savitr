import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useDropzone } from 'react-dropzone';
// import { toast } from 'react-toastify';
// import { uploadUserFile } from 'shared/apis/apis';
// import { useAuth } from 'shared/provider/authProvider';

export const Upload: React.FC = () => {
  const history = useHistory();
  // const auth = useAuth();
  // const [uploaded, setUploaded] = useState<File[]>([]);
  const [isClicked, setClicked] = useState<boolean>(false);

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     if (acceptedFiles.length != 1) {
  //       toast.error('アップロードできるファイルは1つのみです。');
  //       return setUploaded([...uploaded]);
  //     }
  //     return setUploaded([...acceptedFiles]);
  //   },
  //   [uploaded],
  // );

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop, multiple: false });

  // const removeFile = (file: File) => () => {
  //   const newFiles = [...uploaded];
  //   newFiles.splice(newFiles.indexOf(file), 1);
  //   setUploaded(newFiles);
  // };

  // const removeAll = () => {
  //   setUploaded([]);
  // };

  // const handleFileChange = (e: any) => {
  //   const target = e.target as HTMLInputElement;

  //   if (target.files == null) return;
  //   const file = target.files.item(0);
  //   if (file) {
  //     uploaded[0] = file;
  //   } else {
  //     return;
  //   }
  // };

  // const onSubmit = async (): Promise<boolean> => {
  //   if (uploaded[0]) {
  //     const username = auth.user?.email?.split('@')[0] || '';
  //     const isOk = await uploadUserFile(username, uploaded[0]);
  //     return isOk;
  //   }
  //   return false;
  // };

  // const files = uploaded.map((file, idx) => {
  //   return (
  //     <div key={idx} className="border border-dark rounded-lg mx-3 my-1 px-3">
  //       <MDBRow>
  //         <MDBCol md="10">
  //           <div className="d-flex flex-row">
  //             <input className="my-1" id={`fileInput${idx}`} defaultValue={file.name} />
  //             <p className="my-1">{`(${file.size} bytes)`}</p>
  //           </div>
  //         </MDBCol>
  //         <MDBCol md="2">
  //           <span className="float-right">
  //             <MDBIcon icon="times-circle" onClick={removeFile(file)} />
  //           </span>
  //         </MDBCol>
  //       </MDBRow>
  //     </div>
  //   );
  // });

  return (
    <>
      <Container className="my-5">
        <h1>履歴情報のアップロード</h1>
        <p>実験にご協力いただきありがとうございます。このページから履歴情報のアップロードを行ってください。</p>
        <p>
          提供いただいた閲覧履歴は、静岡大学情報学部で行っている研究目的で使用いたします。研究目的にのみ使用し、その他の目的では一切使用いたしません。
        </p>
        <h2 className="mt-5">タスクの流れについて</h2>
        <p>タスクの流れを説明いたします。 手順に従ってアップロードを行ってください。</p>
        <ol className="my-5">
          <li className="my-3">
            閲覧履歴をエクスポートできる拡張機能をダウンロードします。以下のリンク先にアクセスしてください。
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://chrome.google.com/webstore/detail/history-export/lpmoaclacdaofhlijejogfldmgkdlglj/related?hl=ja"
                >
                  History export by Quamilek
                </a>
              </li>
            </ul>
          </li>
          <li className="my-3">画像のようなページが表示されたら、「chromeに追加」をクリックします。</li>
          <img src="/public/img/how2/exportHistory/01.png" width="100%" className="my-3 mx-3" />

          <li className="my-3">ポップアップの内容を確認し、「拡張機能を追加」をクリックします。</li>
          <div className="mx-auto">
            <img src="/public/img/how2/exportHistory/02.png" width="50%" className="my-3 mx-3" />
          </div>

          <li className="my-3">
            「拡張機能が追加されました」と書かれたポップアップが表示されたら、アイコンをクリックします。
          </li>
          <img src="/public/img/how2/exportHistory/03.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">「all history」をクリックします。</li>
          <img src="/public/img/how2/exportHistory/04.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">
            閲覧履歴情報が「history.json」というファイル名で保存されます。ファイル名は変更しないでください。
          </li>
          <img src="/public/img/how2/exportHistory/05.png" width="50%" className="my-3 mx-3" />

          <li className="my-3">
            ダウンロードが完了したら、先程保存した「history.json」というファイルをアップロードしてください。
            アップロード先 URL は
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.dropbox.com/request/8Eaw6J2Yuwhi0MS9FQmr"
              onClick={() => setClicked(true)}
            >
              https://www.dropbox.com/request/8Eaw6J2Yuwhi0MS9FQmr
            </a>
            です。
            <br />
            リンク先は新規タブで開かれます。「Add
            files（ファイルを追加）」をクリックしてファイルをアップロードしてください。
            アップロードが完了したら開かれたタブを閉じ、以下にある「完了コードの発行」をクリックしてください。（リンクを開くとボタンがクリックできるようになります。）
          </li>
        </ol>
        {/*
	  <MDBRow className="border border-dark rounded-lg p-3">
		  {files.length !== 0 ? <div style={{ width: '100%' }}>{files}</div> : <></>}
		  <div {...getRootProps({ className: 'custom-file my-3' })}>
		  <input {...getInputProps()} />
		  {isDragActive ? (
			  <p className="custom-file-label">ファイルを選択してください。</p>
		  ) : (
			  <p className="custom-file-label">ファイルを選択してください。</p>
		  )}
		  </div>
		  </MDBRow>
		  <MDBRow className="my-3">
		  <Button
		  color="primary"
		  type="submit"
		  onClick={async () => {
			  const isOk = await onSubmit();
			  if (isOk) {
				  history.push('/upload/completion');
			  } else {
				  toast.error('アップロードに失敗しました。');
			  }
		  }}
		  >
	アップロードする
	</Button>
	</MDBRow>
	*/}
        <Button
          disabled={!isClicked}
          color="primary"
          onClick={() => {
            history.push('/upload/completion');
          }}
        >
          完了コードの発行
        </Button>
      </Container>
    </>
  );
};
