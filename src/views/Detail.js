import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function POKEMON(name) {
  const query = gql`
  {
    pokemon(name:"${name}") {
      id
      number
      name
      image
      types
      maxCP
      maxHP
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      evolutions {
        name
      }
    }
  }
`;
  return query;
}

function Detail() {
  let { name } = useParams();
  const { loading, error, data } = useQuery(POKEMON(name));
  if (data) {
    const { image } = data.pokemon;
  }
  return (
    <>
      <div className='submenu'>
        <Link to='/pokedex'>{`< Back`}</Link>
      </div>
      <>
        {loading ? (
          <div className='loading'>
            <img src='/pokeball-spining.gif' />
          </div>
        ) : (
          <div className='detail__wrapper'>
            <div className='detail'>
              <div className='detail__card'>
                <div
                  className='detail__image'
                  style={{ backgroundImage: `url(${data.pokemon.image})` }}
                >
                  {/* <img src={data.pokemon.image} /> */}
                </div>
              </div>
              <div className='table'>
                <div className='table__row table__row--head'>
                  <div className='table__item'>{data.pokemon.name}</div>
                  <div className='table__item text-right'>
                    No.{data.pokemon.number}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item'>Type</div>
                  <div className='table__item text-right'>
                    {data.pokemon.types.join(', ')}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item'>Weight</div>
                  <div className='table__item text-right'>
                    {data.pokemon.weight.maximum}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item'>Height</div>
                  <div className='table__item text-right'>
                    {data.pokemon.height.maximum}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item'>MaxCP</div>
                  <div className='table__item text-right'>
                    {data.pokemon.maxCP}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item'>MaxHP</div>
                  <div className='table__item text-right'>
                    {data.pokemon.maxHP}
                  </div>
                </div>
                <div className='table__row'>
                  <div className='table__item '>Evolutions</div>
                </div>

                <div className='table__row'>
                  <div className='table__item'>
                    <ul className='table__list'>
                      {data.pokemon.evolutions ? (
                        <>
                          {data.pokemon.evolutions.map((evo) => (
                            <li key={evo.name}>* {evo.name}</li>
                          ))}
                        </>
                      ) : (
                        <span>–</span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default Detail;
