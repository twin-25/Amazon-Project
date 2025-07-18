import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart', () =>{
      beforeEach(()=>{
        spyOn(localStorage,'setItem');
      })
      it('add an existing product to the cart', ()=>{
        
        

        spyOn(localStorage, 'getItem').and.callFake(() =>{
          return JSON.stringify([{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1' 
          }]);
        });
        //console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    }]));

      })

      it('add a new product to the cart', () =>{

        

        spyOn(localStorage, 'getItem').and.callFake(() =>{
          return JSON.stringify([]);
        });
        //console.log(localStorage.getItem('cart'));
        loadFromStorage();


        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
    }])
        );
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);

      });

});

describe('Test Suite: removeFromCart()', () =>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() =>{
  spyOn(localStorage, 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }
    ]);
  });
  loadFromStorage();
});

  it('Remove a productId that is in the cart', ()=>{
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
    }]) );

  })

  it('Remove a product that is in not in the cart', ()=>{
    removeFromCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(cart.length).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }
    ]));
  });
});

describe( 'Test suite: Update delivery option', () =>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  beforeEach(() => {
  
  spyOn(localStorage, 'setItem');
  spyOn(localStorage, 'getItem').and.callFake(()=>{
    return JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }
    ]);
  });
  loadFromStorage();
});
it('Update a delivery option of an existing item in the cart', ()=>{
  updateDeliveryOption(productId1, '3');
  expect(cart[0].deliveryOptionId).toEqual('3');
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }
    ])
  );
  
});
it('update a delivery option of a product that is not in the cart', ()=>{
  updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", '1');
  expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
    {
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
    },
    {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }
    ])
  );


    });

});