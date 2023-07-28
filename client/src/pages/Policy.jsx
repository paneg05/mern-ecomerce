import Layout from "../components/Layout/Layout"

const Policy = () => {
  return (
    <Layout title='Policy - Ecomerce app'>
        <div className="row contactus">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt=""
              style={{width:'100%'}}
              />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-w text-white text-center">
              CONTACT US
            </h1>
            <p className="mt-3">
              any query and info about product feel free to call anytime we
            </p>
            
          </div>
        </div>
    </Layout>
  )
}

export default Policy