import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import IconDelet from '../../../../../../../../../../assets/icons/icon-delete.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ERROR_TEXT = 'Failed to upload';

export function UploadedDocumentCard({
  name,
  error,
}: {
  name: string;
  error: boolean
}) {
  return (
    <div
      className="uploaded-document-card"
      data-cy="uploaded-document-card"
    >
      <div
        className="uploaded-document-card__inner"
        data-cy="uploaded-document-card-inner"
      >
        <div className="uploaded-document-card__header">
          <h3
            className="uploaded-document-card__name"
            data-cy="uploaded-document-card-name"
          >
            {name.split(' ')[2]}
          </h3>
          <span
            className="uploaded-document-card__delete"
            data-cy="uploaded-document-card-delete"
          >
            <img
              className="uploaded-document-card__icon"
              data-cy="uploaded-document-card-icon"
              src={IconDelet}
              width="20"
              height="20"
              alt="DeleteIcon"
            />
          </span>
        </div>
        {error && (
          <span
            className="uploaded-document-card__error"
            data-cy="uploaded-document-card-error"
          >
            {ERROR_TEXT}
          </span>
        )}
      </div>
    </div>
  );
}
