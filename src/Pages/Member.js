import { useEffect, useState } from "react"
import axios from "axios"

function Member () {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/member")
      .then((res) => {
        // console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <>
    <div className="container mx-auto my-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Gender
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Contact
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Address
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Photo
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Aksi
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.map((item) => {
              return (
                <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.gender}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.contact}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.address}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {item.profile}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <div class="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                      <button class="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
                        Edit
                      </button>

                      <button class="inline-block rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
                        View
                      </button>

                      <button class="inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <a
        class="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        href="/Member/AddMember"
      >
        Add Member
      </a>
    </div>
    
  </>
  )
}

export default Member;