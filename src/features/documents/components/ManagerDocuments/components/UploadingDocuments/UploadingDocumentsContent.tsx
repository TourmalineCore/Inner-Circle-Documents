import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Button } from '@tourmalinecore/react-tc-ui-kit';
import { AllDocumentsStateContext } from '../../../AllDocumentsState/AllDocumentsStateContext';
import { UploadedDocument } from './components/UploadedDocuments/UploadedDocuments';
import { UploaderDocuments } from './components/UploaderDocuments/UploaderDocuments';

export const UploadingDocumentsContent = observer(() => {
  const documentsState = useContext(AllDocumentsStateContext);

  const uploadedDocumentsIsEmpty = documentsState.allUploadedDocuments.length === 0;
  const notValidDocumentsIsEmpty = documentsState.allNotValidDocuments.length === 0;

  return (
    <section className="uploading-documents-content" data-cy="uploading-documents-content">
      <div
        className="uploading-documents-content__header"
        data-cy="uploading-documents-content-header"
      >
        <UploaderDocuments />
        <Button
          className="uploading-documents-content__button"
          data-cy="uploading-documents-content-button"
          disabled={!notValidDocumentsIsEmpty ? true : uploadedDocumentsIsEmpty}
        >
          Confirm
        </Button>
      </div>
      {!uploadedDocumentsIsEmpty
       && (
         <ul
           className="uploading-documents-content__list"
           data-cy="uploading-documents-content-list"
         >
           {documentsState.allUploadedDocuments.map((file) => (
             <li
               key={file.name}
               className="uploading-documents-content__item"
               data-cy="uploading-documents-content-item"
             >
               <UploadedDocument
                 file={file}
                 addNotValidDocuments={() => documentsState.addNotValidDocuments(file)}
               />
             </li>
           ))}
         </ul>
       )}
    </section>
  );
});
