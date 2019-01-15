    // Hilton reservation server
    const {ApolloServer, gql} = require('apollo-server');
    const {filter, find} = require('lodash');

    const resv = [];
    //initial vals
    resv.push({name: "Theo Wilson", id: 1, hotel: "B.H. Hilton", arrivalDate: "Feb-14-2019", departureDate: "Feb-17-2019"});
    resv.push({name: "Angie Brice-Wilson", id: 2, hotel: "B.H. Hilton", arrivalDate: "Feb-14-2019", departureDate: "Feb-17-2019"});
    resv.push({name: "Brooke Wilson", id: 3, hotel: "B.H. Hilton", arrivalDate: "Feb-14-2019", departureDate: "Feb-17-2019"});

    const typeDefs = gql `
        type Reservation {
            name: String
            id: Int
            hotel: String
            arrivalDate: String
            departureDate: String
        }

        type Query {
            resv: [Reservation],
            resvById(id: Int!): Reservation
        }

        type Mutation {
            addReservation(name: String!, hotel: String!, arrivalDate: String!, departureDate: String!) : Reservation
        }
    `;

    const resolvers = {
        Query: {
            resv: () => resv,
            resvById(parent, args, context, info){
                return find(resv, {id: args.id});
            },
        },
        Mutation: {
            addReservation: (root, args) => {
                let newId = Math.max.apply(Math, resv.map(function(r) { return r.id; })) + 1;
                const newResv = {
                    id: newId,
                    name: args.name,
                    hotel: args.hotel,
                    arrivalDate: args.arrivalDate,
                    departureDate: args.departureDate,
                }
                resv.push(newResv);
                return newResv;
            },
        },
    };

    const server = new ApolloServer({typeDefs, resolvers});

    var hotelReservations = [];

    server.listen().then(({url}) => {
        console.log(`server ready at: ${url}`);
    });
    