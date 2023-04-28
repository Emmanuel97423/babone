const ProductListPage: React.FC = () => {
  return (
    <>
      <div className="">
        <table className=" table table-compact w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Stock</th>
              <th>Code bar</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className=" pl-4 ">1</th>
              <td>Moulinet Stella 20000</td>
              <td>Moulinet</td>
              <td>5</td>
              <td>123456789752145</td>
              <td>
                <button className="btn btn-secondary">Gérer</button>
              </td>
            </tr>
            <tr>
              <th className=" pl-4 ">1</th>
              <td>Moulinet Stella 20000</td>
              <td>Moulinet</td>
              <td>5</td>
              <td>123456789752145</td>
              <td>
                <button className="btn btn-secondary">Gérer</button>
              </td>
            </tr>
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>company</th>
              <th>location</th>
              <th>Last Login</th>
              <th>Favorite Color</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
};
export default ProductListPage;
