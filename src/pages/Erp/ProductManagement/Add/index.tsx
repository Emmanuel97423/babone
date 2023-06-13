import Dropdown from '../../../../components/erp/Product/Add/Dropdown';
import Modal from '../../../../components/erp/Product/Add/Modal';

const AddProduct: React.FC = () => {
  return (
    <div className="  p-4 flex flex-col justify-center items-center z-40  relative">
      <h1 className="text-3xl font-bold">Créer un produit</h1>
      <div className="form-control mx-52 ">
        <h2 className="text-xl py-4 font-bold">Détails</h2>

        <div className="flex justify-between">
          <div className="flex flex-col mr-2">
            {' '}
            {/* <label htmlFor="name" className="label ">
              <span className="label-text">Nom</span>
            </label> */}
            <input
              id="name"
              type="text"
              placeholder="Nom"
              className="input input-bordered w-full  hover:input-accent "
            />
            {/* <label className="label">
              <span className="label-text">Catégorie</span>
            </label> */}
            <Dropdown options={[{ value: 'Moulinets', label: 'Moulinets' }]} />
          </div>
          <div className="card w-96 h-10 bg-base-100 shadow-xl image-full">
            <figure>
              <img src="https://placehold.co/600x400" alt="Shoes" />
            </figure>
            <div className="card-body justify-center items-center">
              {/* <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p> */}
              <div className="card-actions ">
                {/* <button className="btn btn-primary">Modifier</button> */}
                <input type="file" className="file-input w-full max-w-xs" />
              </div>
            </div>
          </div>
        </div>
        {/* <label className="label">
          <span className="label-text">Desccription</span>
        </label> */}
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered textarea-lg w-full  hover:input-accent"
        ></textarea>
        <button className=" w-full btn mt-4">Point de vente</button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold ">Options</h2>
          <p className="text-justify">
            Appliquez un groupe d’options personnalisées à un article pour créer
            des variantes. Par exemple, les options de format peuvent créer les
            variantes tel que «petit, moyen et grand».
          </p>
          <div>
            <h3>Nom de l’ensemble d’options</h3>
          </div>
        </div>
        <div>
          <div className="flex py-12 justify-between items-center">
            <h2 className="text-xl font-bold ">Variantes</h2>
            {/* <p className="text-accent font-bold cursor-pointer">
              Modifier les détails de la variante
            </p> */}
            <label
              htmlFor="my-modal-3"
              className="text-accent font-bold cursor-pointer"
            >
              Modifier les détails de la variante
            </label>
          </div>
          <input
            type="text"
            placeholder="REF"
            className="input input-bordered w-full   hover:input-accent "
          />
          <input
            type="text"
            placeholder="EAN CODE"
            className="input input-bordered w-full  my-2 hover:input-accent "
          />
          <input
            type="number"
            placeholder="Prix 0.00 €"
            min="0"
            className="appearance-none input input-bordered w-full  "
          />
        </div>
        {/* <label className="label">
          <span className="label-text-alt">Requis</span>
        </label> */}
      </div>

      {/* modal */}
      <Modal />
    </div>
  );
};
export default AddProduct;
