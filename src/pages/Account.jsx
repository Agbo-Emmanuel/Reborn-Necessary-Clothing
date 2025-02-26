import React from 'react'
import './pagesCss/account.css'

const Account = () => {
  return (
    <>
        <main className='account_body'>
            <section className='account_top_section'>
                <h3>Account Overview</h3>
            </section>
            <section className='account_details_section'>
                <article className='account_details_container'>
                    <div className='account_details_top'>
                        <h4>ACCOUNT DETAILS</h4>
                    </div>
                    <div className='account_details_item'>
                        <h5>Agbo Emmanuel</h5>
                        <p>agboe4102@gmail.com</p>
                    </div>
                </article>
            </section>
        </main>
    </>
  )
}

export default Account