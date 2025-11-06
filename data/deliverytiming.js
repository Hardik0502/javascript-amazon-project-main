export function deliveryopt(deliveryOptionId){
    let deliveryoption ;

    deliveryOptions.forEach((option)=>{
        if(option.id === deliveryOptionId){
            deliveryoption = option ;
        }
    });

    return deliveryoption || deliveryOptions[2] ;
}

export const deliveryOptions = [
    {
        id : '1',
        deliveryDays : 7 ,  // the first option has 7 days after delivery option compare to current date.
        priceCents : 0
    },
    {
        id : '2',
        deliveryDays : 3,
        priceCents : 499,
    },
    {
        id : '3',
        deliveryDays : 1,
        priceCents : 999
    }
]

// We made it for the option like which option, the user select. As user select the option we also have to define that, for which product the option is selected. So we have to store the option id into cart, so the website may know which product's option is selected.
// These are for default option selected. like first product has 2nd option selected, 2nd has 1st selected etc.
