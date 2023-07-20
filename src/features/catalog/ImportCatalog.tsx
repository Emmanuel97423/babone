import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone, DropzoneInputProps } from 'react-dropzone';
import ModalUI from '@/components/ui/Modal';
import { HiArrowLeft } from 'react-icons/hi';
import { BsCheck } from 'react-icons/bs';
import { importCSV } from '@/features/catalog/import/importProductsSlice';
import { AppDispatch, RootState } from '@/store/store';
import type { CSVRowProps } from '@/types/features/import/ImportType';

type importCatalogProps = {
  isOpenModal: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const ImportCatalogue: React.FC<importCatalogProps> = ({
  isOpenModal,
  setIsModalOpen
}) => {
  const [modalPage, setModalPage] = useState<number>(1);
  const [activeDownload, setActiveDownload] = useState<boolean>(false);
  const [csvFile, setCsvFile] = useState<CSVRowProps>();
  const [errorCsvFormat, setErrorCsvFormat] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [importIsLoading, setIsLoadingImport] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const store = useSelector((state: RootState) => state.store.entitie);
  const storeId = store[0].id;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0].type === 'text/csv') {
        setActiveDownload(true);
        setImportSuccess(false);

        // @ts-ignore
        setCsvFile(acceptedFiles[0]);
        setFileName(acceptedFiles[0].name);
      } else {
        setErrorCsvFormat(true);
        setTimeout(() => {
          setErrorCsvFormat(false);
        }, 5000);
      }
    }
  });

  const handleSubmit: () => void = async () => {
    setIsLoadingImport(true);
    try {
      await dispatch(
        // @ts-ignore
        importCSV({ file: csvFile, storeId: storeId })
      );
      setIsLoadingImport(false);
      setImportSuccess(true);
    } catch (error) {
      console.log('error:', error);
      setIsLoadingImport(false);
    }

    // const importStatusLoading = useSelector(
    //   (state: RootState) => state.importProduct.loading
    // );
    // if (importStatusLoading === 'pending') {
    //   setIsLoadingImport;
    // }
  };

  const handleFinishImport: () => void = () => {
    setIsModalOpen(false);
    setImportSuccess(false);
    setActiveDownload(false);
    setFileName('');
  };

  let content;

  if (modalPage == 1) {
    content = (
      <>
        <h2 className="text-center mt-0">
          Choisissez une méthode d’importation
        </h2>
        <div className="flex flex-col">
          <div className="form-control w-full">
            <label className="flex label cursor-pointer">
              <div className="mr-4">
                {' '}
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500 "
                  checked
                />
              </div>

              <div className="flex items-center gap-4 text-left ">
                <span className="basis-40">
                  Modifier le catalogue d’articles
                </span>
                <span className="label-text basis-8/12">
                  Modifiez les articles existants et ajoutez-en de nouveaux. Les
                  articles existants seront révisés, mais ne seront pas
                  supprimés.
                </span>
              </div>
            </label>
          </div>
          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                checked
              />
              <span>Remplacer le catalogue d’articles</span>
              <span className="label-text">
                Écrasez les articles existants. Ceux-ci seront alors tous
                supprimés et remplacés.
              </span>
            </label>
          </div> */}
        </div>
      </>
    );
  } else if (modalPage == 2) {
    content = (
      <>
        <div className="flex items-center mb-12">
          <HiArrowLeft
            size={24}
            onClick={() => setModalPage(1)}
            className="cursor-pointer"
          />
          <h2 className="text-center my-0 ml-8">
            Choisissez une méthode d’importation
          </h2>
        </div>
        <div>
          <p>
            <a
              className="font-bold underline text-accent"
              href="https://fbmqpashvkbldqtjnlds.supabase.co/storage/v1/object/sign/import-csv/admin/import-product-exemple.xlsx?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbXBvcnQtY3N2L2FkbWluL2ltcG9ydC1wcm9kdWN0LWV4ZW1wbGUueGxzeCIsImlhdCI6MTY4NzYyODM1OSwiZXhwIjoxNzE5MTY0MzU5fQ.kybyjhgKLsqO0hARVPOnZnKqynMidpQltCpBK7rrkd4&t=2023-06-24T17%3A39%3A18.441Z"
              download
            >
              Téléchargez le fichier
            </a>
            &nbsp; de votre catalogue pour classer vos articles et ajouter ou
            modifier les informations correspondantes. Nous recommandons
            d’ajouter tous les ensembles de modificateurs, toutes les taxes et
            toutes les catégories avant de procéder à l’importation des
            articles.
          </p>
          <div
            {...getRootProps()}
            className={`${
              fileName ? ' border-accent' : ''
            } border-dashed border-2 p-4 mt-9 rounded-md`}
          >
            <h2 className="m-0">Déposez votre fichier ici</h2>
            <input
              {...(getInputProps() as DropzoneInputProps)}
              className="input"
            />
            {isDragActive ? (
              <p>Relâchez pour déposer les fichiers ici.</p>
            ) : (
              <p>
                ou{' '}
                <span className="text-underline">
                  sélectionnez-le depuis votre ordinateur
                </span>
                {fileName ? (
                  <p className="text-underline font-bold text-accent mb-2">
                    Fichier sélectionné : {fileName}
                  </p>
                ) : (
                  <p className="text-underline font-bold mb-2">
                    Aucun fichier choisi
                  </p>
                )}
              </p>
            )}
          </div>

          <div
            className={`text-red-500 font-bold mt-2 ${
              errorCsvFormat ? 'flex' : 'hidden'
            } `}
          >
            <span>Format du fichier d'import incorrect. (csv attendu)</span>
          </div>
          <div className="flex justify-end mt-9">
            <button
              className={`btn btn-primary ml-auto ${
                activeDownload ? '' : 'btn-disabled'
              } ${importIsLoading ? 'loading loading-spinner' : ''} ${
                importSuccess ? 'hidden' : ''
              }`}
              onClick={handleSubmit}
            >
              Télécharger
            </button>
            <button
              className={`btn btn-success no-animation ml-auto text-white  ${
                importSuccess ? '' : 'hidden'
              } `}
            >
              {/* <BsCheck /> */}
              Import termniné
            </button>
            <button
              className={`btn btn-secondary  ml-4 text-white  ${
                importSuccess ? '' : 'hidden'
              } `}
              onClick={handleFinishImport}
            >
              {/* <BsCheck /> */}
              Fermer
            </button>
          </div>
          {/* Drag and drop prosition */}
        </div>
      </>
    );
  }
  return (
    <>
      <ModalUI
        isOpenModal={isOpenModal}
        setIsModalOpen={setIsModalOpen}
        className="flex flex-col"
        labelModal="Modifier le catalogue d’articles"
      >
        {content}
        <div className="flex justify-end">
          <button
            className={`${modalPage != 1 ? 'hidden' : 'btn btn-primary'} `}
            onClick={() => setModalPage(2)}
          >
            Suivant
          </button>
        </div>
      </ModalUI>
    </>
  );
};

export default ImportCatalogue;
