//Functions
const uploadPost = async () => {

    let postsArea = document.querySelector('.postsArea');
    postsArea.innerHTML = 'Carregando...';

    //Respostas das promisse
    let responsePost = await fetch('https://jsonplaceholder.typicode.com/posts');
    let responseComments = await fetch('https://jsonplaceholder.typicode.com/comments');

    //Transformar as respostas em objetos json
    let jsonPost = await responsePost.json();
    let jsonComments = await responseComments.json();

    //Retornar apenas 6 objetos do array jsonPost
    let jsonPostSlice = jsonPost.slice(0, 6);
    //Retornar apenas 25 objetos do array jsonComments
    let jsonCommentsSlice = jsonComments.slice(0, 29);

    if (jsonPostSlice.length > 0) {
        postsArea.innerHTML = '';

        jsonPostSlice.map((item, index) => {
            let jsonItem = document.querySelector('.models .wrapperPost').cloneNode(true);

            //Setando atributo nos elementos posts
            jsonItem.setAttribute('post-id', index += 1);
            jsonItem.querySelector('.titlePost').innerHTML = item.title;
            jsonItem.querySelector('.postText').innerHTML = item.body;
            document.querySelector('.btnReadMore').innerHTML = 'Read More';

            //Evento de Prevenir o recaregamento da pagina
            jsonItem.querySelector('.btnReadMore').addEventListener('click', (e) => {
                e.preventDefault();


                document.querySelector('.userComments').style.display = 'block';

                //Pegando o atributo post-id de cada item
                let postId = e.target.closest('.wrapperPost').getAttribute('post-id');
                let clearArea = document.querySelector('.commentsArea');

                setTimeout(() => {
                    document.querySelector('.comments').style.display = 'flex';
                }, 300)

                // Percorrendo meu array de objetos Comments
                jsonCommentsSlice.forEach((item) => {
                    if (postId == item.postId) {
                        let commentsItens = document.querySelector('.models .userComments').cloneNode(true);
                        commentsItens.querySelector('.userComments h6').innerHTML = item.name;
                        commentsItens.querySelector('.userComments .userEmail').innerHTML = item.email;
                        commentsItens.querySelector('.userComments .textComments').innerHTML = item.body;
                        document.querySelector('.commentsArea').appendChild(commentsItens);
                        return;
                    };
                });

                //Evento para fechar a section .comments
                document.querySelector('.closeArea').addEventListener('click', () => {
                    document.querySelector('.comments').style.display = 'none';

                    //Limpar a div .commentsArea quando ocorrer evento de close
                    clearArea.innerHTML = '';
                });

            });

            document.querySelector('.postsArea').appendChild(jsonItem);
        });
    }

};

const uploadUsers = async () => {

    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let jsonUser = await response.json();


    jsonUser.forEach((item, index) => {

        let userItem = document.querySelector('.trTbody').cloneNode(true);
        //Colocando o atribudo user-id na class .trTbody
        userItem.setAttribute('user-id', index += 1);
        userItem.querySelector('.tdId').innerHTML = item.id;
        userItem.querySelector('.tdName').innerHTML = item.name;
        userItem.querySelector('.tdEmail').innerHTML = item.email;

        document.querySelector('tbody').appendChild(userItem);

        //Evento
        userItem.querySelector('.btnRealDetails').addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.areaUserDetails').style.display = 'flex';
            let userKey = e.target.closest('.trTbody').getAttribute('user-id');

            if (userKey == item.id) {
                document.querySelector('.details h4').innerHTML = item.name;
                document.querySelector('.details .userEmail').innerHTML = `<b>E-mail: </b> ${item.email}`;
                document.querySelector('.details .userPhone').innerHTML = `<b>Phone: </b> ${item.phone}`;
                document.querySelector('.details .userWebSite').innerHTML = `<b>WebSite: </b> ${item.website}`;
                document.querySelector('.details .userCompany').innerHTML = `<b>Company: </b> ${item.company.name}`;
                document.querySelector('.details .userAddress').innerHTML = `<b>Address: </b> ${item.address.city}, CEP: ${item.address.zipcode}`;

                return;
            };

        });

        //Evento para fechar a section .areaUserDetails
        document.querySelector('.closeDetails').addEventListener('click', () => {
            document.querySelector('.areaUserDetails').style.display = 'none';

        });

    });


};

const scrollWindow = () => {

    document.querySelector('.aUsers').addEventListener('click', ()=>{
        window.scrollTo({
            top: 950,
            behavior: 'smooth'
        });
    })

    document.querySelector('.aPosts').addEventListener('click', ()=>{
        window.scrollTo({
            top: 407,
            behavior: 'smooth'
        });
    })


};

uploadPost();
uploadUsers();
scrollWindow();