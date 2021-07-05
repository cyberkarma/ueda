import React, { useState, useEffect } from 'react';
import apiMethods from 'core/methods';
import CounterpartyNavigation from './counterparty-navigation';
import CounterpartyTransferBalanceNavigation from './counterparty-transfer-balance-navigation';
import { CachedForm, FieldSelect, FieldText } from 'matsumoto/src/components/form';
import NoteCard from '../../parts/note';
import { API } from 'matsumoto/src/core';
import { FormGetFormat } from 'core/service/form';
import Notifications from 'matsumoto/src/stores/notifications-store';

const CounterpartyTransferBalanceAccountOperations = ({ match }) => {
    const [accounts, setAccounts] = useState(null);

    useEffect(()=> {
        API.get({
            url: apiMethods.counterpartyAccountsList(match.params.id),
            success: (accounts) => {
                setAccounts(accounts);
            }
        });
    }, []);

    const submitTransfer = (values) => {
        const { amount, currency, reason, operation } = values
        API.post({
            url: apiMethods.accountOperation(accounts[0].id, operation),
            body: { amount, currency, reason },
            success: () => {
                Notifications.addNotification('Done', null, 'success');
            },
        })
    }

    return (
        <div className="page-content">
            <CounterpartyNavigation match={match}/>
            <CounterpartyTransferBalanceNavigation match={match} />
            <div className="block">
                <div>
                    <h2>Account Operations</h2>
                    <CachedForm
                        onSubmit={submitTransfer}
                        render={(formik) => (
                            <div className="form">
                                <div className="row wide">
                                    <FieldSelect
                                        formik={formik}
                                        id="operation"
                                        label="Type Operation"
                                        placeholder="Please Select"
                                        required
                                        options={[
                                            { value: 'increase-manually', text: 'Increase Manually' },
                                            { value: 'decrease-manually', text: 'Decrease Manually' },
                                            { value: 'replenish', text: 'Replenish' },
                                            { value: 'subtract', text: 'Subtract' }
                                        ]}
                                    />
                                </div>
                                <div className="row wide">
                                    <NoteCard>
                                        Lorem Ipsum is simply dummy text of the ' +
                                        'printing and typesetting industry. Lorem Ipsum has been the industry\'s' +
                                        ' standard dummy text ever since the 1500s, when an unknown printer took a ' +
                                        'galley of type and scrambled it to make a type specime
                                    </NoteCard>
                                </div>
                                <div className="row wide">
                                    <FieldSelect
                                        formik={formik}
                                        id="account"
                                        label="From Account"
                                        placeholder="Please Select"
                                        required
                                        options={FormGetFormat(accounts)}
                                    />
                                </div>
                                <div className="row-group">
                                    <div className="row middle-wide">
                                        <FieldText
                                            formik={formik}
                                            id="amount"
                                            label="Amount"
                                            placeholder="Amount"
                                            numeric
                                        />
                                    </div>
                                    <div className="row slim">
                                        <FieldSelect
                                            formik={formik}
                                            id="currency"
                                            label="Currency"
                                            required
                                            options={[
                                                { value: 'USD', text: 'USD' },
                                                { value: 'EUR', text: 'EUR' },
                                                { value: 'AED', text: 'AED' },
                                                { value: 'SAR', text: 'SAR' }
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="row wide">
                                    <FieldText
                                        formik={formik}
                                        id="reason"
                                        label="Reason"
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <button type="submit" className="button m">
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )

}

export default CounterpartyTransferBalanceAccountOperations;