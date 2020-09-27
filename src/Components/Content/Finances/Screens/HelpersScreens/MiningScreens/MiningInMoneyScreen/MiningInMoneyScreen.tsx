// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Keyboard, StyleSheet, Text, } from "react-native"

// COMPONENTS IMPORTS //
import InputSection from "~/Components/Shared/Sections/FooterInputSection/FooterInputSection"
import Popup from "~/Components/Shared/Components/Popups/PopUp/PopUp"
import { getUserGeneralFinancesInfoThunkCreator } from "~/Redux/Reducers/FinancesReducers/FinancesGetReducer"
// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

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
  addMiningThunkCreator: (moneyAmount: string) => any
  getUserGeneralFinancesInfoThunkCreator: () => void
}

const MiningInMoneyScreen: React.FC<PropsType> = (props) => {
  
  const [popupData, setPopupData] = useState({
    title: null as string | null,
    body: null as string | null,
    visible: false as boolean,
  })

  return (
    <>
      <View style={styles.container}>
	  
		<Text>
		 При покупке депозита проверьте есть ли оплаченная абонентская плата. {JSON.stringify(props.BudgetInfo, true, 4)}
		</Text>
		
      </View>
      <View style={styles.container}>
        <InputSection
          buttonText="Далее"
          valueName="Укажите сумму"
          errorText="Сумма указана неверно"
          isNumberPad
          action={(values: any) => {
            Keyboard.dismiss()
            if (Number(props.BudgetInfo.CGC.price) > 0) {
				
              props.addMiningThunkCreator(values.value).then(() =>
                setPopupData({
                  title: "Спасибо!",
                  body: "Спасибо! Депозит осуществлён.",
                  visible: true,
                })
              )
            } else {
              setPopupData({
                title: "Низкий баланс",
                body: "Операция отменена. Пополните пожалуйста ваш баланс-" + JSON.stringify(props.BudgetInfo, true, 4),
                visible: true,
              })
            }
          }}
        />
      </View>
      <Popup
        buttonsArray={[
          {
            text: "OK",
            action: () => props.navigation.navigate("FinancesMain"),
          },
        ]}
        title={popupData.title as string}
        description={popupData.body as string}
        containerStyle={{
          width: "90%",
        }}
        popupVisible={popupData.visible}
        setPopupVisible={(popupVisibility: boolean) =>
          setPopupData({ ...popupData, visible: popupVisibility })
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default MiningInMoneyScreen
