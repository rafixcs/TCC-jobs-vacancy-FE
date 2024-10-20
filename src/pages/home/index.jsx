import Header from "../../components/header"
import SearchBar from "../../components/searchbar"
import Footer from "../../components/footer"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {

  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  let inputButton = () => {
    navigate("/jobs")
  }


  return (
    <>
      <Header />
      <main className="container mx-auto p-4 mt-20 mb-20 bg-gray-300 border border-gray-300 rounded-lg">
        {<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} buttonHandler={inputButton} />}
        <section>
          <article className="container bg-gray-500 mt-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus, dolor ac vehicula sodales, risus urna ullamcorper quam, a fermentum diam turpis nec lorem. In hac habitasse platea dictumst. Cras et accumsan ipsum. Donec sollicitudin ante mauris, et pretium nunc efficitur sed. Ut eget dictum massa. Aliquam ac diam porta, eleifend sem a, pretium leo. Nam posuere elementum maximus. Aliquam sed libero quis lorem mattis accumsan. Duis et nunc leo. Nulla molestie ligula mollis maximus malesuada. In elementum sem ac neque hendrerit scelerisque.

              Integer vel nulla feugiat, molestie diam at, finibus dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est luctus, elementum arcu sit amet, pellentesque ipsum. Donec tempus eleifend sem eget rutrum. Donec rhoncus mattis imperdiet. Donec venenatis, dui quis condimentum lobortis, lorem magna porttitor nulla, nec dictum est libero et turpis. Donec in faucibus quam. Maecenas quis metus pellentesque, congue est nec, fringilla ligula. Sed scelerisque id erat eu commodo. Nullam tempor magna et urna sodales euismod eget quis nisl. Duis turpis elit, euismod ac laoreet et, volutpat ac sapien. Donec eu commodo urna. Quisque volutpat velit porttitor augue posuere maximus. Quisque sit amet lorem est.

              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras mollis quam quis mollis ultricies. Fusce non velit vestibulum, ultricies nisi ac, consectetur massa. Pellentesque id tempor mi. Aenean fringilla at est vitae maximus. Aliquam molestie mollis dapibus. Aliquam non lacus viverra, tempus dolor vestibulum, finibus lorem. Donec consectetur egestas eros eu interdum. Nunc sagittis augue at neque facilisis, ut sagittis enim porttitor. Cras eget odio euismod, dignissim risus vitae, aliquam magna. Quisque egestas porttitor elit tempus semper. Phasellus fermentum vestibulum ante non egestas. Integer at molestie sem. Nulla facilisi. Proin bibendum urna sit amet augue tempor egestas. Nunc blandit varius ultricies.

              Curabitur tincidunt tincidunt congue. Integer consectetur metus vel ipsum porta dapibus. Maecenas quam ante, aliquet in sapien et, tincidunt porta nunc. Vivamus sed nisi a diam lobortis fringilla. Morbi suscipit enim nunc, ac rutrum magna accumsan in. Maecenas mattis lectus ut nunc feugiat consectetur. Duis varius maximus consectetur. Maecenas vehicula orci dapibus nunc scelerisque accumsan. Praesent facilisis velit nec massa euismod, sed hendrerit sapien vestibulum. Nulla scelerisque libero sed nunc tincidunt pretium. Vivamus molestie, est quis pretium malesuada, turpis enim tempor lectus, nec rutrum risus ante et eros. Aenean eu arcu eu orci tristique posuere vitae vitae massa. Etiam malesuada magna quis eros consectetur dignissim. Maecenas quis erat justo.

              Pellentesque dui mauris, ultrices id venenatis non, commodo efficitur nunc. Phasellus suscipit eros ac nibh suscipit, a convallis lorem imperdiet. Nullam tempus, diam eu eleifend faucibus, ante lorem eleifend ligula, eget luctus dui odio quis sapien. Donec egestas felis finibus erat lacinia, id bibendum purus elementum. Maecenas eu diam vel sem porta porta. Nunc eu velit id elit rutrum lacinia non at elit. Sed eu leo eget enim fermentum faucibus at vel magna. Nulla vitae varius nulla, ut venenatis arcu. Aliquam pellentesque semper sem, at varius velit laoreet at. Nunc ligula leo, pulvinar non elit sed, pretium finibus justo.
            </p>
          </article>
          <article className="container bg-gray-500 mt-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus, dolor ac vehicula sodales, risus urna ullamcorper quam, a fermentum diam turpis nec lorem. In hac habitasse platea dictumst. Cras et accumsan ipsum. Donec sollicitudin ante mauris, et pretium nunc efficitur sed. Ut eget dictum massa. Aliquam ac diam porta, eleifend sem a, pretium leo. Nam posuere elementum maximus. Aliquam sed libero quis lorem mattis accumsan. Duis et nunc leo. Nulla molestie ligula mollis maximus malesuada. In elementum sem ac neque hendrerit scelerisque.

              Integer vel nulla feugiat, molestie diam at, finibus dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a est luctus, elementum arcu sit amet, pellentesque ipsum. Donec tempus eleifend sem eget rutrum. Donec rhoncus mattis imperdiet. Donec venenatis, dui quis condimentum lobortis, lorem magna porttitor nulla, nec dictum est libero et turpis. Donec in faucibus quam. Maecenas quis metus pellentesque, congue est nec, fringilla ligula. Sed scelerisque id erat eu commodo. Nullam tempor magna et urna sodales euismod eget quis nisl. Duis turpis elit, euismod ac laoreet et, volutpat ac sapien. Donec eu commodo urna. Quisque volutpat velit porttitor augue posuere maximus. Quisque sit amet lorem est.

              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras mollis quam quis mollis ultricies. Fusce non velit vestibulum, ultricies nisi ac, consectetur massa. Pellentesque id tempor mi. Aenean fringilla at est vitae maximus. Aliquam molestie mollis dapibus. Aliquam non lacus viverra, tempus dolor vestibulum, finibus lorem. Donec consectetur egestas eros eu interdum. Nunc sagittis augue at neque facilisis, ut sagittis enim porttitor. Cras eget odio euismod, dignissim risus vitae, aliquam magna. Quisque egestas porttitor elit tempus semper. Phasellus fermentum vestibulum ante non egestas. Integer at molestie sem. Nulla facilisi. Proin bibendum urna sit amet augue tempor egestas. Nunc blandit varius ultricies.

              Curabitur tincidunt tincidunt congue. Integer consectetur metus vel ipsum porta dapibus. Maecenas quam ante, aliquet in sapien et, tincidunt porta nunc. Vivamus sed nisi a diam lobortis fringilla. Morbi suscipit enim nunc, ac rutrum magna accumsan in. Maecenas mattis lectus ut nunc feugiat consectetur. Duis varius maximus consectetur. Maecenas vehicula orci dapibus nunc scelerisque accumsan. Praesent facilisis velit nec massa euismod, sed hendrerit sapien vestibulum. Nulla scelerisque libero sed nunc tincidunt pretium. Vivamus molestie, est quis pretium malesuada, turpis enim tempor lectus, nec rutrum risus ante et eros. Aenean eu arcu eu orci tristique posuere vitae vitae massa. Etiam malesuada magna quis eros consectetur dignissim. Maecenas quis erat justo.

              Pellentesque dui mauris, ultrices id venenatis non, commodo efficitur nunc. Phasellus suscipit eros ac nibh suscipit, a convallis lorem imperdiet. Nullam tempus, diam eu eleifend faucibus, ante lorem eleifend ligula, eget luctus dui odio quis sapien. Donec egestas felis finibus erat lacinia, id bibendum purus elementum. Maecenas eu diam vel sem porta porta. Nunc eu velit id elit rutrum lacinia non at elit. Sed eu leo eget enim fermentum faucibus at vel magna. Nulla vitae varius nulla, ut venenatis arcu. Aliquam pellentesque semper sem, at varius velit laoreet at. Nunc ligula leo, pulvinar non elit sed, pretium finibus justo.
            </p>
          </article>
        </section>

      </main>
      <Footer />
    </>
  )
}

export default Home;
