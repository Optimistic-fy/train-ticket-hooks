import React, {useState, useCallback, useEffect, memo, useMemo} from 'react'
import './css/CitySelector.css'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'

const SearchItem = memo(function SearchItem(props){
    const { name, clickCity } = props
    return(
        <li className="city-suggest-li" onClick={() => clickCity(name)}>
            { name }
        </li>
    )
})

const SearchList = memo(function SearchList(props){
    const { searchKey, onSelect } = props
    const [ result, setResult ] = useState([])
    
    useEffect(() => {
        axios.get('/rest/search?key=' + encodeURIComponent(searchKey))
             .then(res => {
                console.log('res', res)
                const { result, searchKey: sKey } = res.data

                if(sKey === searchKey){
                    setResult(result)
                }
             })
             .catch((err) => {
                console.log('err', err)
             })
    }, [searchKey])

    const fallBackResult = useMemo(() => {
        if(!result.length){
            return [{
                display: searchKey,
            }]
        }
        return result
    }, [result, searchKey])

    return(
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallBackResult.map(item => {
                        return(
                            <SearchItem
                                key={item.display}
                                name={item.display}
                                clickCity={onSelect} 
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
})

const CityItem = memo(function CityItem(props){
    const { name, selectCity } = props

    return(
        <li className="city-li" onClick={() => {selectCity(name)}}>
            {name}
        </li>
    )
})

const CityArea = memo(function CityArea(props){
    const { letter, cities = [], selectCity } = props

    return(
        <ul className="city-ul">
            <li className="city-li" key={letter} id={letter} >
                {letter}
            </li>
            {
                cities.map((city) => {
                    return <CityItem name={city.name} key={city.name} selectCity={selectCity}  />
                })
            }
        </ul>
    )
})

const Alpha = memo(function Alpha(props){
    const { alpha, toAlpha } = props
    return(
        <i className="city-index-item" onClick={() => toAlpha(alpha) }>
            { alpha }
        </i>
    )
})

const alphaBet = Array.from(new Array(26), (ele, index) => {
    //得到26个英文字母
    return String.fromCharCode(65 + index);
})

const CityList = memo(function CityList(props){
    const { area, selectCity, toAlpha } = props

    return(
        <div className="city-list">
            <div className="city-cate">
                {
                    area.map(item => {
                        return(
                            <CityArea 
                                key={item.title} 
                                letter={item.title} 
                                cities={item.citys} 
                                selectCity={selectCity}
                            />
                        )
                    })
                }
            </div>
            <div className="city-index">
                {
                    alphaBet.map(alpha => {  //循环得到右边字母列表
                        return (
                            <Alpha key={alpha} alpha={alpha} toAlpha={toAlpha} />
                        )
                    })
                }
            </div>
        </div>
    )
})

const CitySelector = memo(function CitySelector(props){
    const { show, cityData, isLoading, onBack, getCityData, selectCity } = props
    const [inputValue, setInputValue] = useState('')

    const clearInput = useCallback(() => {
        setInputValue('')
    }, [])

    useEffect(() => {
        if(!show || cityData || isLoading){
            return;
        }
        getCityData()
    }, [show, cityData, isLoading])

    const toAlpha = useCallback(alpha => {
        document.getElementById(`${alpha}`).scrollIntoView()
    }, [])

    const cityShow = () => {
        if(isLoading){
            return (<div>Loading</div>)
        }
        if(cityData){
            return (
                <CityList selectCity={selectCity} area={cityData.cityList} toAlpha={toAlpha} />
            )
        }
        return (<div>Error</div>)
    }

    return (
        <div className={classnames('city-selector', {hidden: !show})}>
            <div className="city-search">
                <div className="search-back" onClick={onBack}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input 
                        type="text"
                        value={inputValue}
                        className="search-input"
                        placeholder="请输入城市、车站"
                        onChange={e => setInputValue(e.target.value)}
                    />
                </div>
                <i 
                    className={classnames('search-clean', {hidden: inputValue.length === 0})} 
                    onClick={clearInput}
                >&#xf063;</i>
            </div>
            <div>
                {
                    Boolean(inputValue) && ( <SearchList searchKey={inputValue} onSelect={key => selectCity(key)} />)
                }
            </div>
            <div className="city-list-posit">
                { cityShow() }
            </div>
        </div>
    )
})

SearchItem.prototype = {
    name: PropTypes.string.isRequired,
    clickCity: PropTypes.func.isRequired
}

SearchList.prototype = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

CityItem.propTypes = {
    name: PropTypes.string.isRequired,
    selectCity: PropTypes.func.isRequired
}

CityArea.propTypes = {
    letter: PropTypes.string.isRequired,
    cities: PropTypes.array,
    selectCity: PropTypes.func.isRequired
}

Alpha.prototype = {
    alpha: PropTypes.string.isRequired,
    toAlpha: PropTypes.func.isRequired
}

CityList.propTypes = {
    area: PropTypes.array.isRequired,
    selectCity: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired
}

CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    getCityData: PropTypes.func.isRequired,
    selectCity: PropTypes.func.isRequired
}

export default CitySelector;