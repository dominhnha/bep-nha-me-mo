import React from 'react'
import PropTypes from 'prop-types'
import Section, { SectionBody, SectionTitle } from '../Section/Section'
import { useState } from 'react'
import { GetPurchaseHistoryByUser } from '../../services/Authencation/PurchaseHistory'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContextProvider'
import { useEffect } from 'react'
import './UserHistory.scss'
import { formatTimestamptoDate } from '../../utils/Format'

export const UserHistoryItem = ({HistoryItem}) => {
    const [checked, setChecked] = useState(false);
    const handleChecked = () => {
        setChecked(!checked)
    }
    return <div className='UserHistoryItem'>
        <div className="UserHistoryItem__header" onClick={() => handleChecked()}>
            <div className="UserHistoryItem__id">{HistoryItem.id}</div>
            <div className="UserHistoryItem__time"> {HistoryItem.time == "Time" ? <>Time</> :<input type="date" value={HistoryItem.time} disabled /> }</div>
            <div className="UserHistoryItem__total">{HistoryItem.total}</div>
            <div className="UserHistoryItem__status">{HistoryItem.status}</div>
            <div className="UserHistoryItem__drop"><i class='bx bxs-down-arrow'></i></div>
        </div>

        <div className="UserHistoryItem__sub">
            
        </div>
    </div>
}

const UserHistory = props => {
    const { Authur, dispatch } = useContext(AuthContext);
    const [history, setHistory] = useState(null);
    console.log(Authur)
    useEffect(() => {
        const getHistory = async () => {
            if (Authur.payload.uid) {
                const data = await GetPurchaseHistoryByUser(Authur.payload.uid)
                if (data.success) setHistory(data.payload)
            }
        }
        getHistory()
    }, [])
    console.log("hítory",history)
    return (
        <div className='UserHistory'>
            <SectionTitle>Lịch sử mua hàng</SectionTitle>
            <div className="UserHistory__list">
                <UserHistoryItem
                    HistoryItem={{ id: "ID", time: "Time", total: "toTal", status: "STATUS" }}
                />
                {history
                    ? history.map((item,key) => {
                        console.log(key,item)
                        console.log()
                        return (
                            <UserHistoryItem
                                key={`HistoryItem ${key}`}
                                HistoryItem={{ id: item.PurID, total: `${item.Info.Total}₫`, status: item.Info.Status,time:formatTimestamptoDate(item.Info.DayPurchased.toDate()),listItem:item.Info.Item}}
                            />
                        )
                    })
                    : null
                }
            </div>




        </div>
    )
}

UserHistory.propTypes = {}

export default UserHistory