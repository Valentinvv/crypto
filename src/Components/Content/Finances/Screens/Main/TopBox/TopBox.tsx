// PLUGINS IMPORTS //
import React from "react"
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  dispatch,
  StyleSheet,
} from "react-native"

// COMPONENTS IMPORTS //
import ListItem from "./ListItem/ListItem"

// EXTRA IMPORTS //
import CustomHeader from "~/Components/Shared/Components/CustomHeader/CustomHeader"
import { getUserGeneralFinancesInfoThunkCreator } from "~/Redux/Reducers/FinancesReducers/FinancesGetReducer"
/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  test: any
  BudgetInfo: {
    CGC: {
      price: string
      value2: string
    }

    MiningCGC: {
      price: string
      value2: string
    }

    DailyIncome: {
      price: string
      value2: string
    }
    INPH: {
      price: string
      value2: string
    }
    wallet: string
  }
}

const TopBox: React.FC<PropsType> = (props) => {
  return (
    <ImageBackground
      source={require("~/Images/bg-1.png")}
      imageStyle={{ borderBottomRightRadius: 25, borderBottomLeftRadius: 25 }}
      style={styles.container}
    >
      <CustomHeader title="Финансы" />
      <View style={styles.content_wrap}>
        <Text style={{ ...styles.title, marginBottom: 20 }}>
          Текущий баланс
        </Text>
        <View style={styles.list_wrap}>
          <ListItem
            title="CGC:"
            firstValue={props.BudgetInfo.CGC.price}
            secondValue={`${props.BudgetInfo.CGC.value2 || "0"} $`}
          />
          <ListItem
            title="Майнинг CGC:"
            firstValue={props.BudgetInfo.MiningCGC.price}
            secondValue={`${props.BudgetInfo.MiningCGC.value2 || "0"} $`}
            loading
          />
          <ListItem
            title="Доход в сутки:"
            firstValue={props.BudgetInfo.DailyIncome.price}
            secondValue={`${props.BudgetInfo.DailyIncome.value2 || "0"} $`}
          />
          <ListItem
            title="INPH:"
            firstValue={props.BudgetInfo.INPH.price}
            secondValue={`${props.BudgetInfo.INPH.value2 || "0"} $`}
          />
        </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => props.test()}
        >

          <Text style={styles.text}>Обновить данные</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => props.navigation.navigate("TransactionsHistory")}
        >
          <Image
            style={styles.icon}
            source={require("~/Images/Icons/icon-clock.png")}
          />
          <Text style={styles.text}>Открыть историю транзакций</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },

  content_wrap: {
    marginTop: 10,
    marginHorizontal: 20,
  },

  list_wrap: {
    marginRight: 15,
    marginTop: -7.5,
    marginBottom: 20,
  },

  footer: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 275,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16.5,
  },

  text: {
    color: "white",
    fontSize: 16.5,
  },

  icon: {
    height: 20,
    width: 20,
    resizeMode: "center",
  },
})






type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
// Get user finances info
export const getUserGeneralFinancesInfoThunkCreator_1 = (): ThunkType => {

  return async (dispatch, getState: any) => {
    const state = getState()
    await axios
      .post(
        "https://cgc.capital/api_interface",
        JSON.stringify(
          JWT.encode(
            {
              action: "finance",
              test: "ok",
              uid: state.AuthSetState.userID,
            },
            key
          )
        )
      )
      .then(async (res: any) => {
        const data = JWT.decode(res.data.data, key)

        dispatch(
          ActionCreatorsList.setUserFinancesInfoActionCreator(
            {
              price: data.cgc,
              value2: data.cgcUSD,
            },
            {
              price: data.profit,
              value2: data.profitUSD,
            },
            {
              price: data.profitSec,
              value2: data.profitSecUSD,
            },
            {
              price: data.inph,
              value2: data.inphUSD,
            },
            data.wallet
          )
        )
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response)
        }
      })
  }
}


export default TopBox
