import Layout from "../components/Layout/Layout"
import {BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi'


const Contact = () => {
  return (
    <Layout title={'contact us - Ecomerce app'}>
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
            <p className="mt-3">
              <BiMailSend />: aluncard6@gmail.com
            </p>
            <p className="mt-3">
              <BiPhoneCall />: 61 98147-8117
            </p>
            <p className="mt-3">
              <BiSupport />: 61 98147-8117
            </p>
          </div>
        </div>
    </Layout>
  )
}

export default Contact