import React from 'react'
import { TransitionablePortal } from 'semantic-ui-react'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantsGrid from '../components/RestaurantsGrid'

export default function Home() {
    return (
        <div>
            <AddRestaurant/>
            <RestaurantsGrid/>
        </div>
    )
}
