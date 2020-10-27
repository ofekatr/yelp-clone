import React, { useContext, useEffect } from "react";
import { Button, Icon, Rating, Table } from "semantic-ui-react";
import RestaurantFinder from "../api/restaurants";
import { RestaurantContext } from "../context";
import range from "../utils/range";
import DeleteButton from "./DeleteButton";

export default function RestaurantsGrid() {
  const { restaurants, setRestaurants }: any = useContext(RestaurantContext);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { restaurants } = (await RestaurantFinder.get("/")).data.data;
        setRestaurants(restaurants);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [setRestaurants]);

  const deleteRestaurant = (id) => {
    try {
      RestaurantFinder.delete(`/${id}`);
    } catch (err) {
      console.error(err);
    }
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  return (
    <div>
      {restaurants && (
        <Table celled inverted striped style={{ borderRadius: "8px" }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Restaurant</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Location</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Price Range
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Ratings</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {restaurants.map(({ id, name, city, price_range }, i) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Icon name="utensils" /> {name}
                </Table.Cell>
                <Table.Cell textAlign="center">{city}</Table.Cell>
                <Table.Cell textAlign="center">
                  {range(0, price_range).map((j) => {
                    return (
                      <Icon name="dollar sign" key={id.toString().repeat(j)} />
                    );
                  })}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    inverted
                    color="yellow"
                    style={{
                      paddingRight: "6px",
                      padding: "11px 4px 11px 10px",
                    }}
                  >
                    Update   
                    <Icon name="refresh" />
                  </Button>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Rating
                    icon="star"
                    size="large"
                    defaultRating={3}
                    maxRating={5}
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <DeleteButton callback={deleteRestaurant} id={id} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
