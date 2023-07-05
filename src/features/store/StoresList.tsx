import AddStore from './AddStore';
interface Store {
  name: string;
  address: string;
  zip: number;
}
const StoreList: React.FC = () => {
  const stores: Store[] = [
    { name: 'Exo-Trap', address: 'foo', zip: 97460 },
    { name: 'Littoral Pêche', address: 'foo', zip: 97460 }
  ];
  const list = stores.map((store: Store) => (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl image-full mt-6">
        <figure>
          <img
            src="https://picsum.photos/384/200?grayscale"
            alt="store-image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{store.name}</h2>
          {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Modifier</button>
            <button className="btn btn-primary">Choisir</button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <AddStore />
      {list}
    </>
  );
};
export default StoreList;
