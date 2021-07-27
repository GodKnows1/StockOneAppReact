import React from 'react'
import { Container } from 'react-bootstrap'

function Home() {
    return (
        <div>
            <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">Stock One App</h1>
                    <p class="lead text-muted">Welcome to the leading Stock Market Platform which provides you a variety of features to
                        gather information and to  analyze the market condition on various factors.
                    </p>
                </div>
            </section>
            <main style={{ backgroundColor: '#f8f9fa' }}>
                <Container>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" />
                                <div class="card-body">
                                    <p class="card-text">Comparision between the sectors is provided by the application and you can even analyze a sector over the different period</p>
                                    
                                </div>
                            </div>
                        </div>

                        {/*  */}

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                {/* <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" /> */}
                                <div class="card-body">
                                    <p class="card-text">About the Companies registered under this site their ipos and comparision of share prices over a period and at different time period</p>
                                   
                                </div>
                            </div>
                        </div>

                        {/*  */}

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                {/* <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&bg=55595c&fg=eceeef&text=Thumbnail" alt="Card image cap" /> */}
                                <div class="card-body">
                                    <p class="card-text">You can find the exchanges details companies registered under them and their company code </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </div>
    )
}

export default Home
