import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Nav, NavItem, NavLink, Row, Tooltip } from "reactstrap";
import "./styles.css"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import exportIcon from '../../assets/images/Expand Icon.svg'
import firstChart from '../../assets/images/ui_IA-1.svg'
import secondChart from "../../assets/images/ui_IA-2.svg"
import thirdChart from "../../assets/images/ui_IA-3.svg"
import quadChart from "../../assets/images/ui_IA-4.svg"
import fifthChart from "../../assets/images/ui_IA-5.svg"
import sixthChart from "../../assets/images/ui_IA-6.svg"
import bs1 from "../../assets/images/bo_new_1.svg"
import bs2 from "../../assets/images/bo_2.svg"
import bs3 from "../../assets/images/bo_3.svg"
import bs4 from "../../assets/images/bo_4.svg"
import BizzyIcon from "../../assets/images/Icon_Ask_Bz2.svg"
import Card2 from "./card2";
import Card3 from "./card3"
import Card1 from "./card1";
import Card4 from "./card4";
import Card5 from "./card5";
import BS1 from "./bs1";
import BS2 from "./bs2";
import BS3 from "./bs3";
import Card6 from "./Card6";
import CalendarComponent from "pages/Dashboard/calender";
import { constrainPoint } from "@fullcalendar/core/internal";
import MiniChat from "./miniAskBizzy";
import Ask from '../../assets/images/Icon_Ask_6.svg'
import BS4 from "./bs4";

const IA = props => {
  document.title = "Opsentrix I&A";
  const categories = ["Sales", "Events", "Prediction", "Sentiment"];
  const actions = ["Inventory", "Menu", "Staffing", "Marketing"];
  const [actCat, setactcat] = useState([])
  const [actact, setactact] = useState([])
  const [open, Setopen] = useState(false)
  const [currentIndex, SetcurrentIndex] = useState(0)
  const [modal, setModal] = useState(false);
  const [chatModel, setChatModel] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [date, setdate] = useState("13-09-2024");
  const [BizzyIndex, SetBizzyIndex] = useState(0)


  const toggle = () => setModal(!modal);

  const chatToggle = () => setChatModel(!chatModel)

  let role = JSON.parse(localStorage.getItem('authUser'))
  console.log(role)
  let color = {
    "Inventory": "#fee5f1",
    "Staffing": "#dafeeb",
    "Marketing": "#def3ff",
    "Menu": "#feebd4",
    "Training": "#def3ff"
  }
  const images = [firstChart, secondChart, thirdChart, quadChart, fifthChart, sixthChart]
  let master_data = [
    {
      "title": "Sales before and after event (Equinox, September 21,2024)",
      "image": images[0],
      "cat": ["Sales", "Events", "Prediction"],
      "content": "Projected sales for upcoming September Equinox event on September 21st. Projection based on historic trends.",
      "actions": ["Inventory", "Staffing", "Marketing"],
      "review": {
        "Detailed Analysis": [
          {
            "Past Event Name": "September Equinox",
            "Past Event Date": "2023-09-22",
            "Future Event Name": "September Equinox",
            "Future Event Date": "2024-09-22",
            "Sales Day Before": 3279.8,
            "Sales Day Of": 2481.26,
            "Sales Day After": 5955.85,
            "Change Before to Event (%)": -24.34721629367644,
            "Change Event to After (%)": 140.03328953837968
          }
        ]
      }
    },
    {
      "title": "Top 10 projected category sales",
      "image": images[1],
      "cat": ["Sales", "Prediction"],
      "content": "Projected sales and top 10 item categories for the next 7 days. Projection based on historic sales.",
      "actions": ["Inventory", "Staffing", "Marketing"],
      "review": {
        "Projected Total Sales": 22074,
        "Top 10 Projected Category Sales": {
          "Tapas": 6207,
          "Hoofdgerechten": 3302,
          "addon": 2355,
          "Frisdrank": 1204,
          "Koffie": 1074,
          "Specials lunch": 1055,
          "Bier van de tap": 813,
          "Witte wijn": 597,
          "Voorgerechten": 492,
          "Lunch vlees": 458
        }
      }
    },
    {
      "title": "Top 10 significant changes in sales",
      "image": images[2],
      "cat": ["Sales"],
      "content": 'Analyzed category sales changes over the past week versus prior 8-week average. Top 10 categories with the highest percentage changes identified.',
      "actions": ["Inventory", "Menu", "Marketing"],
      "review": {
        "Top 10 Significant Changes": [
          {
            "Category": "Arrangementen",
            "Average Sales (Previous 8 Weeks)": 786,
            "Total Sales (Last Week)": 4421,
            "Change Percentage": 462.26
          },
          {
            "Category": "Alcoholvrij wijnen",
            "Average Sales (Previous 8 Weeks)": 7,
            "Total Sales (Last Week)": 27,
            "Change Percentage": 300.0
          },
          {
            "Category": "Soepen",
            "Average Sales (Previous 8 Weeks)": 106,
            "Total Sales (Last Week)": 258,
            "Change Percentage": 143.66
          },
          {
            "Category": "Chocolademelk",
            "Average Sales (Previous 8 Weeks)": 12,
            "Total Sales (Last Week)": 26,
            "Change Percentage": 112.2
          },
          {
            "Category": "Gin & tonic",
            "Average Sales (Previous 8 Weeks)": 70,
            "Total Sales (Last Week)": 148,
            "Change Percentage": 111.02
          },
          {
            "Category": "Mocktails",
            "Average Sales (Previous 8 Weeks)": 53,
            "Total Sales (Last Week)": 7,
            "Change Percentage": -87.3
          },
          {
            "Category": "Cocktails",
            "Average Sales (Previous 8 Weeks)": 385,
            "Total Sales (Last Week)": 78,
            "Change Percentage": -79.72
          },
          {
            "Category": "Rode wijn",
            "Average Sales (Previous 8 Weeks)": 217,
            "Total Sales (Last Week)": 388,
            "Change Percentage": 78.72
          },
          {
            "Category": "Overig",
            "Average Sales (Previous 8 Weeks)": -268,
            "Total Sales (Last Week)": -476,
            "Change Percentage": 77.37
          },
          {
            "Category": "Kind voorgerechten",
            "Average Sales (Previous 8 Weeks)": 9,
            "Total Sales (Last Week)": 4,
            "Change Percentage": -57.89
          }
        ]
      }
    },
    {
      "title": "Weekly Sentiment Scores Trend",
      "image": images[3],
      "cat": ["Sales", "Sentiment"],
      "content": "Weekly sentiment scores for reviews from August 15 to September 13, 2024 were analyzed. The sentiment scores are consecutively moving down in the last two weeks.",
      "actions": ["Staffing", "Marketing"],
      "review": {
        "Weekly Sentiment Scores": [
          {
            "WeekOf": "2024-08-12",
            "AverageSentimentScore": 0.31897905630361434
          },
          {
            "WeekOf": "2024-08-19",
            "AverageSentimentScore": 0.2535653785756836
          },
          {
            "WeekOf": "2024-08-26",
            "AverageSentimentScore": 0.26284149923107386
          },
          {
            "WeekOf": "2024-09-02",
            "AverageSentimentScore": 0.29522891648543376
          },
          {
            "WeekOf": "2024-09-09",
            "AverageSentimentScore": 0.20904333957889817
          }
        ],
        "Filtered Reviews": [
          {
            "ReviewSource": "TripAdvisor",
            "Reviewer": "Kriston",
            "Review": "Location is center of the village Quiet - even when there was a festival I could hear nothing Friendly staff Nice restaurant too Complementary water Parking outside Breakfast was a bit pricey for what it was",
            "ReviewSentimentScore": 0.175,
            "ReviewDate": "2024-08-21",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "TripAdvisor",
            "Reviewer": "Esther",
            "Review": "Dinner was above expectations. Breakfast was poor. Bread was gone, no cutlery and no fresh vegetables and fruit. Yogurt in plastic cups. Breakfast.",
            "ReviewSentimentScore": -0.183333333,
            "ReviewDate": "2024-08-26",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "TripAdvisor",
            "Reviewer": "Michele",
            "Review": "Camera pulita, restaurant availability for colazione and pasti. Assenza dell'ascensore ed il personale non aiuta nel portare i bagagli, basso rapporto costo/qualità.",
            "ReviewSentimentScore": 0,
            "ReviewDate": "2024-08-23",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "TripAdvisor",
            "Reviewer": "Klaudia",
            "Review": "(null) The breakfast piece",
            "ReviewSentimentScore": 0,
            "ReviewDate": "2024-08-23",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8989",
            "Review": "We stopped at the restaurant for morning coffee on our trip to France. We sat on the terrace, having a wonderful view of the old town and river. We took coffee and snacks. Service is outstanding, to say the least. The waitress is attentive, kind and helpful. Wow what an experience these days. We will come back for a meal.",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-08-15",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2161",
            "Review": "Stayed here for 2 days with my partner as a last getaway before my delivery. This hotel is highly recommended!!!! Super friendly staff, neat and clean room with air conditioning, wifi, ... We really enjoyed our stay. Breakfast was delicious and definitely worth € 12.50. Dinner was also worth it. Staff is always ready with a smile and advice!!!",
            "ReviewSentimentScore": 0.395596590909091,
            "ReviewDate": "2024-08-15",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9272",
            "Review": "The moment you open the door and step inside you immediately feel at home. A nice and friendly welcome by the staff. The restaurant has a spacious view and space for enough people. There is a good menu with something for everyone. Due to the wide choice it is difficult to choose but after your choice it is also served very nicely. The service is smooth and always with a friendly smile. Nothing is too much. The rooms are not too big but very nicely decorated and clean, and certainly not noisy. The breakfast had a wide choice of bread, toppings and yoghurt. And this was also always refilled. When paying there was a small problem that was not with the hotel, but this was solved professionally and with a smile. This was our second visit to this hotel but certainly not the last time.",
            "ReviewSentimentScore": 0.191495238095238,
            "ReviewDate": "2024-08-15",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6172",
            "Review": "With a group of golfing friends I enjoyed a fantastic Tappas meal on the terrace of Thuis. We were 10 people and the dishes came, deliciously prepared, nice and fast. It was a beautiful summer evening so we enjoyed food and drinks on the terrace for a long time. It was such that we have planned this again for next year. Incidentally, the rooms were excellent and the breakfast fine.",
            "ReviewSentimentScore": 0.451388889,
            "ReviewDate": "2024-08-15",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2164",
            "Review": "We stopped at the restaurant for morning coffee on our trip to France. We sat on the terrace, having a wonderful view of the old town and river. We took coffee and snacks. Service is outstanding, to say the least. The waitress is attentive, kind and helpful. Wow what an experience these days. We will come back for a meal.",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-08-15",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6594",
            "Review": "Accueil sympathique, détendu et souriant. Les chambres sont agréables, very nice restaurant with a grand terrace, new evenings very nice. You are the right address for your recommendation.",
            "ReviewSentimentScore": 0.496415584415584,
            "ReviewDate": "2024-08-16",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2291",
            "Review": "Very dissatisfied. 1 person was vegetarian but got soup with bacon bits in it. Indicated this and was told a new soup was offered. It turned out that they had tried to fish the bacon out. Staff also did not know how many rounds we were going for, while this had been arranged in advance. This is how it also went wrong with the people who did not want fish.",
            "ReviewSentimentScore": 0.084090909,
            "ReviewDate": "2024-08-16",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8394",
            "Review": "Have been here several times for dinner but the quality of the food is deteriorating rapidly, black burnt meat, small quantities and poor service, a pity it was always very good.",
            "ReviewSentimentScore": -0.001111111,
            "ReviewDate": "2024-08-17",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1443",
            "Review": "Our son's wedding celebrated here with Tapas menu. Very good and especially tasty. Good service, nice staff. Good price-quality ratio.",
            "ReviewSentimentScore": 0.543333333333333,
            "ReviewDate": "2024-08-17",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4465",
            "Review": "Definitely recommended to spend a leisurely evening with good food and drinks for a reasonable price",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-08-17",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2919",
            "Review": "On the way home in Dinteloord, a nice village atmospherically situated around a creek with the village harbour at 100m. Together with grandpa and grandma and our children we chose a Tapas dinner. Everyone could choose what he wanted and really, everything was delicious. Also try the surprise tapas dinner of the chef, recommended. Complete with a gin and tonic, wines and beers in all kinds available we also ended this holiday day with a golden edge. Nathalie and crew, thank you!",
            "ReviewSentimentScore": 0.445833333333333,
            "ReviewDate": "2024-08-18",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4881",
            "Review": "On the way home, in Zeeland many culinary experiences richer, a short break is needed. Dinteloord or all places, but at Thuis you also feel right at home. Nicely decorated, fast service, nice coffee and the sandwiches yummy. This is definitely worth the stop. The sandwiches warm meat and brie with ham fill like a meal and taste great.",
            "ReviewSentimentScore": 0.388571428571429,
            "ReviewDate": "2024-08-18",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4648",
            "Review": "Last Saturday we had tapas here, atmospheric restaurant and the food was delicious! Enough choice on the menu.",
            "ReviewSentimentScore": 0.25,
            "ReviewDate": "2024-08-18",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6212",
            "Review": "The essence is very good, the Tappas Flatrate is unschlagbar. Also, the normal ones are well-balanced, im Kühlschrank reift dry aged Beef. The operation is very friendly and the language is perfect in German and English! Wirklich Top Service",
            "ReviewSentimentScore": 0.320092592592593,
            "ReviewDate": "2024-08-18",
            "WeekOf": "2024-08-12"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3903",
            "Review": "very good, sufficient food and neatly taken care of, breakfast was also good. Festival was also good, sufficient snacks",
            "ReviewSentimentScore": 0.77,
            "ReviewDate": "2024-08-19",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4691",
            "Review": "Very dissatisfied. 1 person was vegetarian but got soup with bacon bits in it. Indicated this and was told a new soup was offered. It turned out that they had tried to fish the bacon out. Staff also did not know how many rounds we were going for, while this had been arranged in advance. This is how it also went wrong with the people who did not want fish.",
            "ReviewSentimentScore": 0.084090909,
            "ReviewDate": "2024-08-19",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5255",
            "Review": "We went here to eat tapas. It was delicious. Staff very friendly and fast. Cozy and friendly atmosphere. Delicious wines and cocktails. We had a wonderful evening. Thank you!",
            "ReviewSentimentScore": 0.551785714285714,
            "ReviewDate": "2024-08-19",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1759",
            "Review": "Have been here several times for dinner but the quality of the food is deteriorating rapidly, black burnt meat, small quantities and poor service, a pity it was always very good.",
            "ReviewSentimentScore": -0.001111111,
            "ReviewDate": "2024-08-19",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9621",
            "Review": "Slept and ate. Fish salad was really delicious: there was a lot of fish in the salad, no expense spared! Large bedroom with lovely bed and spacious modern shower! And quiet place and restaurant closes at 22:00 so no inconvenience from that.",
            "ReviewSentimentScore": 0.392857142857143,
            "ReviewDate": "2024-08-19",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6423",
            "Review": "Our son's wedding celebrated here with Tapas menu. Very good and especially tasty. Good service, nice staff. Good price-quality ratio.",
            "ReviewSentimentScore": 0.543333333333333,
            "ReviewDate": "2024-08-20",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9167",
            "Review": "By chance ended up at Restaurant Thuis. Bread platter of the house as an appetizer was fine with aioli and tapenade. Main courses tasted good. A bit too little salad and fries. All in all a bit on the pricey side; all main courses around 20 to 24 euros. The interior was neat and atmospheric, but quite noisy when it was busy.",
            "ReviewSentimentScore": 0.194642857142857,
            "ReviewDate": "2024-08-20",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8142",
            "Review": "Nice restaurant. The owner is just a jerk of a guy, not at all customer friendly. We have been rudely addressed by this man several times.",
            "ReviewSentimentScore": 0.16875,
            "ReviewDate": "2024-08-20",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4424",
            "Review": "Nice and casual eaten in this restaurant. You can keep ordering all kinds of dishes that you then get served on a small plate. All for a fixed price. The food is tasty and well seasoned and the service keeps a close eye on everything.",
            "ReviewSentimentScore": 0.04,
            "ReviewDate": "2024-08-20",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6936",
            "Review": "The partially covered terrace offers plenty of space. Remarkably, this space is not used to comply with the Corona regulations. For example, service is rendered at the table and the order is not placed on a side table. Besides the staff is too close. In any case, not one and a half meters away. Though Corona registration is compulsory. Lunch tastes great and is reasonably priced. Nevertheless, the order is not correctly executed. The ordered omelette with salmon suddenly becomes an omelette with cheese. The staff does not come to the table to take the order or to pay - upon request. Also, the young staff does not pass the wrong omelette to the kitchen. The heat and many guests may be affecting the staff. The beautiful terrace is located on a fairly busy road. Large trucks and huge agricultural vehicles disturb the peace. Many visitors come by bicycle. The service can and must improve.",
            "ReviewSentimentScore": 0.24984126984127,
            "ReviewDate": "2024-08-21",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5301",
            "Review": "I was with a coach party en route to Amsterdam and we stopped for 45 minutes in Dinteloord. I went into the Thuis and was greeted by a very charming young lady who spoke excellent English. Very good beer, and tomato soup to die for + the most tasty bread I have had in years!",
            "ReviewSentimentScore": 0.590833333333333,
            "ReviewDate": "2024-08-21",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5916",
            "Review": "First introduction for us to Thuis, on the recommendation of and with friends we went here for dinner. On Saturday evening when we arrived at half past seven it was fully booked, good that we had made a reservation in advance. We (two couples) chose the Tapas menu. A very wide choice of all kinds of small dishes. Fish, Meat and Vegetarian. The concept leads in some restaurants to a focus on drinks and slow service. That is not the case at Thuis. All the service staff is super friendly, quick and helpful. Not pushy with drinks but present exactly on time when the glasses are empty. That is how it should be. The small dishes are, where possible, already prepared so that the time between ordering and serving can be called short. You order one dish at a time but get two, so coordination with your table companions is useful. A selection of the starters: spicy potato soup, beef croquettes (truly phenomenal) chicken drumsticks, Spanish meat platter and much more. Among the main courses, the pork tenderloin (hopefully not the \"culinary/ham-like\" variant?) was a bit of a disappointment in terms of quality, steak and other dishes were perfect. From the dessert menu, you order three at a time, which are also served at once. Neatly presented and tastes great. Definitely recommended, we will definitely drive to Dinteloord again for it.",
            "ReviewSentimentScore": 0.097738095,
            "ReviewDate": "2024-08-22",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6181",
            "Review": "visiting dinteloord to see if this is a nice village to live in. on the advice of a resident we went here for lunch. the food was good",
            "ReviewSentimentScore": 0.478787878787879,
            "ReviewDate": "2024-08-22",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1910",
            "Review": "Clean hotel with a nice restaurant and friendly staff in the center of Dinteloord. We spent the night in a small room, which lacked a closet, there were only a few shelves to put clothes on. Luckily we were only there for two days. Furthermore, both the overnight stay and dinner were fine.",
            "ReviewSentimentScore": 0.131060606,
            "ReviewDate": "2024-08-23",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7336",
            "Review": "We stopped at the restaurant for morning coffee on our trip to France. We sat on the terrace, having a wonderful view of the old town and river. We took coffee and snacks. Service is outstanding, to say the least. The waitress is attentive, kind and helpful. Wow what an experience these days. We will come back for a meal.",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-08-23",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5722",
            "Review": "Nice and casual eaten in this restaurant. You can keep ordering all kinds of dishes that you then get served on a small plate. All for a fixed price. The food is tasty and well seasoned and the service keeps a close eye on everything.",
            "ReviewSentimentScore": 0.04,
            "ReviewDate": "2024-08-23",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5030",
            "Review": "The essence is very good, the Tappas Flatrate is unschlagbar. Also, the normal ones are well-balanced, im Kühlschrank reift dry aged Beef. The operation is very friendly and the language is perfect in German and English! Wirklich Top Service",
            "ReviewSentimentScore": 0.320092592592593,
            "ReviewDate": "2024-08-24",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4723",
            "Review": "The moment you open the door and step inside you immediately feel at home. A nice and friendly welcome by the staff. The restaurant has a spacious view and space for enough people. There is a good menu with something for everyone. Due to the wide choice it is difficult to choose but after your choice it is also served very nicely. The service is smooth and always with a friendly smile. Nothing is too much. The rooms are not too big but very nicely decorated and clean, and certainly not noisy. The breakfast had a wide choice of bread, toppings and yoghurt. And this was also always refilled. When paying there was a small problem that was not with the hotel, but this was solved professionally and with a smile. This was our second visit to this hotel but certainly not the last time.",
            "ReviewSentimentScore": 0.191495238095238,
            "ReviewDate": "2024-08-24",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6062",
            "Review": "The partially covered terrace offers plenty of space. Remarkably, this space is not used to comply with the Corona regulations. For example, service is rendered at the table and the order is not placed on a side table. Besides the staff is too close. In any case, not one and a half meters away. Though Corona registration is compulsory. Lunch tastes great and is reasonably priced. Nevertheless, the order is not correctly executed. The ordered omelette with salmon suddenly becomes an omelette with cheese. The staff does not come to the table to take the order or to pay - upon request. Also, the young staff does not pass the wrong omelette to the kitchen. The heat and many guests may be affecting the staff. The beautiful terrace is located on a fairly busy road. Large trucks and huge agricultural vehicles disturb the peace. Many visitors come by bicycle. The service can and must improve.",
            "ReviewSentimentScore": 0.24984126984127,
            "ReviewDate": "2024-08-24",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1949",
            "Review": "Had a great meal, it was quiet but just busy enough to have a nice time. My first time here but I will definitely go back. Fair price for what you get.",
            "ReviewSentimentScore": 0.30625,
            "ReviewDate": "2024-08-24",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2482",
            "Review": "Great experience to eat a chef-composed tapas menu in such a hospitable way. Varied, ample and even Zeeland mussels on request. Evening filling.",
            "ReviewSentimentScore": 0.4,
            "ReviewDate": "2024-08-24",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9619",
            "Review": "too few fries and salad if you eat with several couples, just as many fries and salads if you eat alone, if you order extra you have to pay extra... layout lacks warmth of plants or the general feeling of home is missing",
            "ReviewSentimentScore": 0.021428571,
            "ReviewDate": "2024-08-25",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8075",
            "Review": "Super tasty and good food ;-) Service friendly and fast certainly not rushed. Really recommended if you want to eat well. Bread platter as a starter also super tasty!",
            "ReviewSentimentScore": 0.295982142857143,
            "ReviewDate": "2024-08-25",
            "WeekOf": "2024-08-19"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1730",
            "Review": "First introduction for us to Thuis, on the recommendation of and with friends we went here for dinner. On Saturday evening when we arrived at half past seven it was fully booked, good that we had made a reservation in advance. We (two couples) chose the Tapas menu. A very wide choice of all kinds of small dishes. Fish, Meat and Vegetarian. The concept leads in some restaurants to a focus on drinks and slow service. That is not the case at Thuis. All the service staff is super friendly, quick and helpful. Not pushy with drinks but present exactly on time when the glasses are empty. That is how it should be. The small dishes are, where possible, already prepared so that the time between ordering and serving can be called short. You order one dish at a time but get two, so coordination with your table companions is useful. A selection of the starters: spicy potato soup, beef croquettes (truly phenomenal) chicken drumsticks, Spanish meat platter and much more. Among the main courses, the pork tenderloin (hopefully not the \"culinary/ham-like\" variant?) was a bit of a disappointment in terms of quality, steak and other dishes were perfect. From the dessert menu, you order three at a time, which are also served at once. Neatly presented and tastes great. Definitely recommended, we will definitely drive to Dinteloord again for it.",
            "ReviewSentimentScore": 0.097738095,
            "ReviewDate": "2024-08-26",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8830",
            "Review": "Ordered a tomahawk steak pork, but the whole thing was just a little bigger than a carbonade. The vegetables consisted of a very small bowl of lettuce that still had to be shared. Disappointing experience for me.",
            "ReviewSentimentScore": -0.1825,
            "ReviewDate": "2024-08-26",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5883",
            "Review": "Very good only the service was a bit slow. We had all the time so it didn't matter. The food was great",
            "ReviewSentimentScore": 0.3525,
            "ReviewDate": "2024-08-26",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3082",
            "Review": "Since moving to Dinteloord, I have eaten at Thuis! Uit several times. Both for business meetings and with family, even for a Christmas dinner! Varied menu with options for vegetarians/vegans. I have ordered the bavette (steak) and surf/turf several times and have been extremely satisfied almost every time. Consistently tasty and cooked perfectly to my liking every time. The dessert consists of small treats that you order separately and combine together, such as cheesecake/brownie/stroopwafel partait. Furthermore, excellent service and pleasant ambiance.",
            "ReviewSentimentScore": 0.359259259259259,
            "ReviewDate": "2024-08-27",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6229",
            "Review": "Had a bite to eat with a motorcycle club on the way. Lovely weather makes the large terrace immediately cosy. Spacious parking spaces and large tables. Friendly and fast service, not at the expense of quality. Food is good and tasty. We should do this more often.",
            "ReviewSentimentScore": 0.386224489795918,
            "ReviewDate": "2024-08-27",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3526",
            "Review": "The essence is very good, the Tappas Flatrate is unschlagbar. Also, the normal ones are well-balanced, im Kühlschrank reift dry aged Beef. The operation is very friendly and the language is perfect in German and English! Wirklich Top Service",
            "ReviewSentimentScore": 0.320092592592593,
            "ReviewDate": "2024-08-27",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3419",
            "Review": "I'm gluten-free so I did appreciate the gluten-free bread option but the menu only offered to choices of gluten free meals (according to the menu) which was disappointing. It's so easy to make a gluten-free meal & so appreciated. My husband however was blown away by the ribs ...plenty of them & delicious. The menu is not huge but they also offer a tapas meal for a set price. The staff spoke fluent English, of course it's the Netherlands! A very friendly local spot. We ate on the terrace but the restaurant inside looked great. I would definitely go again.",
            "ReviewSentimentScore": 0.210069444444444,
            "ReviewDate": "2024-08-28",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8630",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-08-28",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1324",
            "Review": "This restaurant opened about a year ago, from the beginning a good tone was set. Nice sitting in relaxed atmosphere, large terrace outside. A smooth and flexible service, reasonable price performance ratio. The menu could be a bit more surprising.",
            "ReviewSentimentScore": 0.414285714285714,
            "ReviewDate": "2024-08-29",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5486",
            "Review": "Cold coffee was replaced by hot coffee. Pay twiceWe sat on the terrace where snails had left behind the necessary slime trails. Only a bucket of water welcomes us as guests.",
            "ReviewSentimentScore": -0.125,
            "ReviewDate": "2024-08-29",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4319",
            "Review": "We like to visit this good Restaurant. The food is very good. Friendly Staff and nice place to enjoy the food and wine....like the name already tells........it feels like At Home (Thuis)",
            "ReviewSentimentScore": 0.597,
            "ReviewDate": "2024-08-30",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4081",
            "Review": "too few fries and salad if you eat with several couples, just as many fries and salads if you eat alone, if you order extra you have to pay extra... layout lacks warmth of plants or the general feeling of home is missing",
            "ReviewSentimentScore": 0.021428571,
            "ReviewDate": "2024-08-30",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8422",
            "Review": "We had already driven past here regularly and now stopped on this sunny Sunday. Ample parking in front of the door. A large terrace with both sun and shade. Neat service by young people under the supervision of an experienced lady. For the detail they do not have Coca Cola but Pepsi. Furthermore neat and clean good and varied music in the background certainly not disturbing. Well filled lunch menu with something for everyone. We had the home burger and the strips of tenderloin. Both very tasty the tenderloin with a tasty sauce and the burger still a tiny bit pink but cooked and juicy. The hand cut fries nice yellow gold and not golden yellow. Definitely recommended and we will definitely go back even if the sun is not shining because it also looks neat authentic inside. Recommended",
            "ReviewSentimentScore": 0.191102756892231,
            "ReviewDate": "2024-08-30",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2487",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-08-30",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6067",
            "Review": "Our son's wedding celebrated here with Tapas menu. Very good and especially tasty. Good service, nice staff. Good price-quality ratio.",
            "ReviewSentimentScore": 0.543333333333333,
            "ReviewDate": "2024-08-30",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3631",
            "Review": "my family of three eat here last Sunday. One of the few places we found open. Great burgers and fries!",
            "ReviewSentimentScore": 0.2,
            "ReviewDate": "2024-08-31",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1528",
            "Review": "Super tasty and good food ;-) Service friendly and fast certainly not rushed. Really recommended if you want to eat well. Bread platter as a starter also super tasty!",
            "ReviewSentimentScore": 0.295982142857143,
            "ReviewDate": "2024-08-31",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7656",
            "Review": "On our way home we went to a restaurant we knew, but it was closed. We thought we had to drive to Roosendaal or Bergen op Zoom. We drove through the center of Dinteloord and our eye fell on an attractive looking restaurant....just look inside....nice hostess...but give it a try.....we were pleasantly surprised and had a delicious meal!",
            "ReviewSentimentScore": 0.34,
            "ReviewDate": "2024-08-31",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2360",
            "Review": "During our stay at this hotel we ate in the restaurant twice in the evening. Unlike almost everyone else we did not choose the popular Tapaz, but simply the menu. Excellent! Despite the enormous crowds (on Saturday it was completely full) friendly, fast and efficient service. Breakfast was - considering the price of E 13.50 - a bit disappointing. If it had been included in the room price we would have been happy with it. Now it was expensive considering the offer. Room 10 is small. No view through the skylight. However, the room and shower room were modern and well cleaned. The wifi is of excellent quality; you rarely come across that in such a large building. A ten with a pencil for the bed reading lamps! Not seen before on our many wanderings. The bottle of mineral water that we found in the room was friendly. We found the beds too hard. We missed the coffee and tea facilities that are almost always present in the small room. The friendly staff and the delicious food from the restaurant will remain with us from our stay at Thuis!",
            "ReviewSentimentScore": 0.224900793650794,
            "ReviewDate": "2024-08-31",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4925",
            "Review": "With a group of golfing friends I enjoyed a fantastic Tappas meal on the terrace of Thuis. We were 10 people and the dishes came, deliciously prepared, nice and fast. It was a beautiful summer evening so we enjoyed food and drinks on the terrace for a long time. It was such that we have planned this again for next year. Incidentally, the rooms were excellent and the breakfast fine.",
            "ReviewSentimentScore": 0.451388889,
            "ReviewDate": "2024-09-01",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5210",
            "Review": "delicious and fast eaten both starter and main course as well as dessert, can be repeated. recommended for everyone.",
            "ReviewSentimentScore": 0.455555555555556,
            "ReviewDate": "2024-09-01",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1184",
            "Review": "With a group of golfing friends I enjoyed a fantastic Tappas meal on the terrace of Thuis. We were 10 people and the dishes came, deliciously prepared, nice and fast. It was a beautiful summer evening so we enjoyed food and drinks on the terrace for a long time. It was such that we have planned this again for next year. Incidentally, the rooms were excellent and the breakfast fine.",
            "ReviewSentimentScore": 0.451388889,
            "ReviewDate": "2024-09-01",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7765",
            "Review": "I have eaten at Thuis quite a few times now. Always with friends. The Tapas arrangement gives you the opportunity to vary and try things out. The menu has changed a bit since our last visit. The portions have become a bit bigger in my opinion. Excellent of course! The service (recording) is very friendly and fast. Due to the large number of choices, it seems like hell to take the order with a mobile phone. To be honest, it didn't always go well, but not worth commenting on. Extra credit for the \"flank steak\", the steak and of course the bitterballen (which fortunately remained). The potato soup is missed. In my opinion, there are relatively many \"cheesy\" dishes on the new menu. It should be clear that I am not a cheese lover. I understand that the concept means that many dishes are prepared in advance and that \"preferably without cheese, no fish\" is very difficult to achieve. The above is intended as positive input, certainly not as criticism. Team Thuis thank you very much for a nice evening with delicious dishes. Keep up the good work, I would like to come again.",
            "ReviewSentimentScore": 0.207731168831169,
            "ReviewDate": "2024-09-01",
            "WeekOf": "2024-08-26"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7274",
            "Review": "Definitely recommended to spend a leisurely evening with good food and drinks for a reasonable price",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-09-02",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1143",
            "Review": "Visited the restaurant again after years. This visit was very disappointing. The food was not of good quality. The onions on the hamburger were burnt and bitter. The fries were only burned small pieces. The service was a bit messy. Too bad... That's why we decided not to have dessert. Hope this was an exception",
            "ReviewSentimentScore": -0.19,
            "ReviewDate": "2024-09-02",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6977",
            "Review": "We went here to eat tapas. It was delicious. Staff very friendly and fast. Cozy and friendly atmosphere. Delicious wines and cocktails. We had a wonderful evening. Thank you!",
            "ReviewSentimentScore": 0.551785714285714,
            "ReviewDate": "2024-09-02",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5971",
            "Review": "The essence is very good, the Tappas Flatrate is unschlagbar. Also, the normal ones are well-balanced, im Kühlschrank reift dry aged Beef. The operation is very friendly and the language is perfect in German and English! Wirklich Top Service",
            "ReviewSentimentScore": 0.320092592592593,
            "ReviewDate": "2024-09-02",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8078",
            "Review": "Accueil sympathique, détendu et souriant. Les chambres sont agréables, very nice restaurant with a grand terrace, new evenings very nice. You are the right address for your recommendation.",
            "ReviewSentimentScore": 0.496415584415584,
            "ReviewDate": "2024-09-02",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9625",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-09-03",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8718",
            "Review": "Slept and ate. Fish salad was really delicious: there was a lot of fish in the salad, no expense spared! Large bedroom with lovely bed and spacious modern shower! And quiet place and restaurant closes at 22:00 so no inconvenience from that.",
            "ReviewSentimentScore": 0.392857142857143,
            "ReviewDate": "2024-09-03",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9075",
            "Review": "nothing special but the food is very good, friendly staff and very reasonable prices. Parking in front of the door (easy in case of rain etc.) not too big restaurant, cozy and therefore nothing to complain about.",
            "ReviewSentimentScore": 0.305068027210884,
            "ReviewDate": "2024-09-03",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5210",
            "Review": "This restaurant has been changed from a complete dive to a nice restaurant. Large outside terrace where you can relax under an umbrella or lounge seats. Inside looks nice and clean. Food is okay, bit more variation in the menu would be great.",
            "ReviewSentimentScore": 0.408994709,
            "ReviewDate": "2024-09-03",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6612",
            "Review": "Definitely recommended to spend a leisurely evening with good food and drinks for a reasonable price",
            "ReviewSentimentScore": 0.3,
            "ReviewDate": "2024-09-03",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7391",
            "Review": "Cold coffee was replaced by hot coffee. Pay twiceWe sat on the terrace where snails had left behind the necessary slime trails. Only a bucket of water welcomes us as guests.",
            "ReviewSentimentScore": -0.125,
            "ReviewDate": "2024-09-04",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2111",
            "Review": "Clean hotel with a nice restaurant and friendly staff in the center of Dinteloord. We spent the night in a small room, which lacked a closet, there were only a few shelves to put clothes on. Luckily we were only there for two days. Furthermore, both the overnight stay and dinner were fine.",
            "ReviewSentimentScore": 0.131060606,
            "ReviewDate": "2024-09-04",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1702",
            "Review": "The food at this hotel is excellent and in addition to the choice from the menu they also have delicious tapas. Also delicious healthy smoothies are tasty. Per round of tapas you can choose something per person and you get that dish times the number of people you are. On the table The food comes to the table quickly",
            "ReviewSentimentScore": 0.605555555555556,
            "ReviewDate": "2024-09-04",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2878",
            "Review": "nothing special but the food is very good, friendly staff and very reasonable prices. Parking in front of the door (easy in case of rain etc.) not too big restaurant, cozy and therefore nothing to complain about.",
            "ReviewSentimentScore": 0.305068027210884,
            "ReviewDate": "2024-09-04",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6766",
            "Review": "Disappointed in how this \"good\" thing has been left behind...it is not possible for the service to provide drinks and food. After eating the first tapas dish, we had to wave to the waiter for another round after 45 minutes after it had been picked up. Food comes 15 minutes apart so you can't wait for each other. Furnishings are also slowing down.",
            "ReviewSentimentScore": -0.035069444,
            "ReviewDate": "2024-09-05",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1015",
            "Review": "too few fries and salad if you eat with several couples, just as many fries and salads if you eat alone, if you order extra you have to pay extra... layout lacks warmth of plants or the general feeling of home is missing",
            "ReviewSentimentScore": 0.021428571,
            "ReviewDate": "2024-09-05",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7412",
            "Review": "First introduction for us to Thuis, on the recommendation of and with friends we went here for dinner. On Saturday evening when we arrived at half past seven it was fully booked, good that we had made a reservation in advance. We (two couples) chose the Tapas menu. A very wide choice of all kinds of small dishes. Fish, Meat and Vegetarian. The concept leads in some restaurants to a focus on drinks and slow service. That is not the case at Thuis. All the service staff is super friendly, quick and helpful. Not pushy with drinks but present exactly on time when the glasses are empty. That is how it should be. The small dishes are, where possible, already prepared so that the time between ordering and serving can be called short. You order one dish at a time but get two, so coordination with your table companions is useful. A selection of the starters: spicy potato soup, beef croquettes (truly phenomenal) chicken drumsticks, Spanish meat platter and much more. Among the main courses, the pork tenderloin (hopefully not the \"culinary/ham-like\" variant?) was a bit of a disappointment in terms of quality, steak and other dishes were perfect. From the dessert menu, you order three at a time, which are also served at once. Neatly presented and tastes great. Definitely recommended, we will definitely drive to Dinteloord again for it.",
            "ReviewSentimentScore": 0.097738095,
            "ReviewDate": "2024-09-05",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2849",
            "Review": "In the middle of Dinteloord in a beautiful spot. Bicycle racks with charging points. Smooth, friendly service, spacious, comfortable terrace. Only saw the lunch menu: extensive and choice for everyone for a reasonable price. Nice place to take a break while cycling. Also plenty of options for dinner.",
            "ReviewSentimentScore": 0.313888888888889,
            "ReviewDate": "2024-09-06",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7840",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-09-06",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1763",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-09-06",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7324",
            "Review": "Stayed here for 2 days with my partner as a last getaway before my delivery. This hotel is highly recommended!!!! Super friendly staff, neat and clean room with air conditioning, wifi, ... We really enjoyed our stay. Breakfast was delicious and definitely worth € 12.50. Dinner was also worth it. Staff is always ready with a smile and advice!!!",
            "ReviewSentimentScore": 0.395596590909091,
            "ReviewDate": "2024-09-06",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4285",
            "Review": "I'm gluten-free so I did appreciate the gluten-free bread option but the menu only offered to choices of gluten free meals (according to the menu) which was disappointing. It's so easy to make a gluten-free meal & so appreciated. My husband however was blown away by the ribs ...plenty of them & delicious. The menu is not huge but they also offer a tapas meal for a set price. The staff spoke fluent English, of course it's the Netherlands! A very friendly local spot. We ate on the terrace but the restaurant inside looked great. I would definitely go again.",
            "ReviewSentimentScore": 0.210069444444444,
            "ReviewDate": "2024-09-06",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7174",
            "Review": "Our son's wedding celebrated here with Tapas menu. Very good and especially tasty. Good service, nice staff. Good price-quality ratio.",
            "ReviewSentimentScore": 0.543333333333333,
            "ReviewDate": "2024-09-07",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5643",
            "Review": "I have eaten at Thuis quite a few times now. Always with friends. The Tapas arrangement gives you the opportunity to vary and try things out. The menu has changed a bit since our last visit. The portions have become a bit bigger in my opinion. Excellent of course! The service (recording) is very friendly and fast. Due to the large number of choices, it seems like hell to take the order with a mobile phone. To be honest, it didn't always go well, but not worth commenting on. Extra credit for the \"flank steak\", the steak and of course the bitterballen (which fortunately remained). The potato soup is missed. In my opinion, there are relatively many \"cheesy\" dishes on the new menu. It should be clear that I am not a cheese lover. I understand that the concept means that many dishes are prepared in advance and that \"preferably without cheese, no fish\" is very difficult to achieve. The above is intended as positive input, certainly not as criticism. Team Thuis thank you very much for a nice evening with delicious dishes. Keep up the good work, I would like to come again.",
            "ReviewSentimentScore": 0.207731168831169,
            "ReviewDate": "2024-09-07",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_7147",
            "Review": "We like to visit this good Restaurant. The food is very good. Friendly Staff and nice place to enjoy the food and wine....like the name already tells........it feels like At Home (Thuis)",
            "ReviewSentimentScore": 0.597,
            "ReviewDate": "2024-09-08",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3016",
            "Review": "Fantastic High Tea ..Enjoyed with my mother and sister ..More than enough and everything equally delicious 👌Highly recommended 😋",
            "ReviewSentimentScore": 0.39,
            "ReviewDate": "2024-09-08",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2088",
            "Review": "This restaurant has been changed from a complete dive to a nice restaurant. Large outside terrace where you can relax under an umbrella or lounge seats. Inside looks nice and clean. Food is okay, bit more variation in the menu would be great.",
            "ReviewSentimentScore": 0.408994709,
            "ReviewDate": "2024-09-08",
            "WeekOf": "2024-09-02"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9667",
            "Review": "A neat hotel with simple but clean rooms where everything you need was present. In the cozy restaurant you can have a great lunch and dinner. The service is friendly and professional. The dishes are masterful, especially the hamburgers and the 12 o'clock of meat or fish. We had a problem with our booking company where we had booked but the manager/manager solved this neatly and professionally. The extra step he had to take he did with the greatest customer friendliness. The name \"home\" is well chosen.....",
            "ReviewSentimentScore": 0.295138888888889,
            "ReviewDate": "2024-09-09",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6415",
            "Review": "Ordered a tomahawk steak pork, but the whole thing was just a little bigger than a carbonade. The vegetables consisted of a very small bowl of lettuce that still had to be shared. Disappointing experience for me.",
            "ReviewSentimentScore": -0.1825,
            "ReviewDate": "2024-09-09",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4291",
            "Review": "Disappointed in how this \"good\" thing has been left behind...it is not possible for the service to provide drinks and food. After eating the first tapas dish, we had to wave to the waiter for another round after 45 minutes after it had been picked up. Food comes 15 minutes apart so you can't wait for each other. Furnishings are also slowing down.",
            "ReviewSentimentScore": -0.035069444,
            "ReviewDate": "2024-09-09",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3666",
            "Review": "my family of three eat here last Sunday. One of the few places we found open. Great burgers and fries!",
            "ReviewSentimentScore": 0.2,
            "ReviewDate": "2024-09-09",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4280",
            "Review": "This restaurant has been changed from a complete dive to a nice restaurant. Large outside terrace where you can relax under an umbrella or lounge seats. Inside looks nice and clean. Food is okay, bit more variation in the menu would be great.",
            "ReviewSentimentScore": 0.408994709,
            "ReviewDate": "2024-09-09",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1811",
            "Review": "I'm gluten-free so I did appreciate the gluten-free bread option but the menu only offered to choices of gluten free meals (according to the menu) which was disappointing. It's so easy to make a gluten-free meal & so appreciated. My husband however was blown away by the ribs ...plenty of them & delicious. The menu is not huge but they also offer a tapas meal for a set price. The staff spoke fluent English, of course it's the Netherlands! A very friendly local spot. We ate on the terrace but the restaurant inside looked great. I would definitely go again.",
            "ReviewSentimentScore": 0.210069444444444,
            "ReviewDate": "2024-09-10",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8196",
            "Review": "Nice big terrace with friendly service. The lunch menu is one of thirteen in a dozen and there is nothing wrong with that, also because you can compare well. I had two croquettes with bread. The bread was tasty, the croquettes too, but they were only 2/3 of the size of a normal croquette. And then it is actually relatively expensive.",
            "ReviewSentimentScore": 0.017857143,
            "ReviewDate": "2024-09-10",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4007",
            "Review": "First introduction for us to Thuis, on the recommendation of and with friends we went here for dinner. On Saturday evening when we arrived at half past seven it was fully booked, good that we had made a reservation in advance. We (two couples) chose the Tapas menu. A very wide choice of all kinds of small dishes. Fish, Meat and Vegetarian. The concept leads in some restaurants to a focus on drinks and slow service. That is not the case at Thuis. All the service staff is super friendly, quick and helpful. Not pushy with drinks but present exactly on time when the glasses are empty. That is how it should be. The small dishes are, where possible, already prepared so that the time between ordering and serving can be called short. You order one dish at a time but get two, so coordination with your table companions is useful. A selection of the starters: spicy potato soup, beef croquettes (truly phenomenal) chicken drumsticks, Spanish meat platter and much more. Among the main courses, the pork tenderloin (hopefully not the \"culinary/ham-like\" variant?) was a bit of a disappointment in terms of quality, steak and other dishes were perfect. From the dessert menu, you order three at a time, which are also served at once. Neatly presented and tastes great. Definitely recommended, we will definitely drive to Dinteloord again for it.",
            "ReviewSentimentScore": 0.097738095,
            "ReviewDate": "2024-09-11",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_3049",
            "Review": "Nicely decorated, cozy, good food, good service, a party to go out, finally a place where you feel like eating out is a party",
            "ReviewSentimentScore": 0.36,
            "ReviewDate": "2024-09-11",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_1492",
            "Review": "Had a great meal and a pleasant evening. The concept of 'always two of the same dishes' is strange when you are three and certainly when one of the three is a vegetarian.",
            "ReviewSentimentScore": 0.339523809523809,
            "ReviewDate": "2024-09-11",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_5674",
            "Review": "Beautiful stylishly decorated restaurant, where we ate delicious tapas. Excellent service, beautiful large terrace!",
            "ReviewSentimentScore": 0.744642857142857,
            "ReviewDate": "2024-09-11",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8556",
            "Review": "The partially covered terrace offers plenty of space. Remarkably, this space is not used to comply with the Corona regulations. For example, service is rendered at the table and the order is not placed on a side table. Besides the staff is too close. In any case, not one and a half meters away. Though Corona registration is compulsory. Lunch tastes great and is reasonably priced. Nevertheless, the order is not correctly executed. The ordered omelette with salmon suddenly becomes an omelette with cheese. The staff does not come to the table to take the order or to pay - upon request. Also, the young staff does not pass the wrong omelette to the kitchen. The heat and many guests may be affecting the staff. The beautiful terrace is located on a fairly busy road. Large trucks and huge agricultural vehicles disturb the peace. Many visitors come by bicycle. The service can and must improve.",
            "ReviewSentimentScore": 0.24984126984127,
            "ReviewDate": "2024-09-12",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_4136",
            "Review": "By chance ended up at Restaurant Thuis. Bread platter of the house as an appetizer was fine with aioli and tapenade. Main courses tasted good. A bit too little salad and fries. All in all a bit on the pricey side; all main courses around 20 to 24 euros. The interior was neat and atmospheric, but quite noisy when it was busy.",
            "ReviewSentimentScore": 0.194642857142857,
            "ReviewDate": "2024-09-12",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_9708",
            "Review": "Last Saturday we had tapas here, atmospheric restaurant and the food was delicious! Enough choice on the menu.",
            "ReviewSentimentScore": 0.25,
            "ReviewDate": "2024-09-12",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_8508",
            "Review": "my family of three eat here last Sunday. One of the few places we found open. Great burgers and fries!",
            "ReviewSentimentScore": 0.2,
            "ReviewDate": "2024-09-12",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_6981",
            "Review": "Slept and ate. Fish salad was really delicious: there was a lot of fish in the salad, no expense spared! Large bedroom with lovely bed and spacious modern shower! And quiet place and restaurant closes at 22:00 so no inconvenience from that.",
            "ReviewSentimentScore": 0.392857142857143,
            "ReviewDate": "2024-09-13",
            "WeekOf": "2024-09-09"
          },
          {
            "ReviewSource": "BookingCom",
            "Reviewer": "Reviewer_2497",
            "Review": "Visited the restaurant again after years. This visit was very disappointing. The food was not of good quality. The onions on the hamburger were burnt and bitter. The fries were only burned small pieces. The service was a bit messy. Too bad... That's why we decided not to have dessert. Hope this was an exception",
            "ReviewSentimentScore": -0.19,
            "ReviewDate": "2024-09-13",
            "WeekOf": "2024-09-09"
          }
        ]
      }
    },
    {
      "title": "Top 5 Items with Highest Total Discounts (Aug 30 - Sep 13, 2024)",
      "image": images[4],
      "cat": ["Sales"],
      "content": "Analyzed discounts/refunds from Aug 30-Sep 13, 2024. Identified top 5 discounted items by total amount. Tapas had the highest discount.",
      "actions": ["Staffing", "Training"],
      "review": {
        "Top 5 items with highest total discounts(last 2 weeks)":
          [{ "Item Name": "Catering", "Item Category ": "Catering", "Total_Discounted_Items": -1, "Total_Discount_Amount": -0.01, "Occurrences": 1 },
          { "Item Name": "Zonder bier", "Item Category ": "addon", "Total_Discounted_Items": 1, "Total_Discount_Amount": -3.0, "Occurrences": 1 },
          { "Item Name": "Ginger beer", "Item Category ": "Frisdrank", "Total_Discounted_Items": -1, "Total_Discount_Amount": -3.25, "Occurrences": 1 },
          { "Item Name": "Tonic", "Item Category ": "Frisdrank", "Total_Discounted_Items": -1, "Total_Discount_Amount": -3.25, "Occurrences": 1 },
          { "Item Name": "Rose lemonade", "Item Category ": "Frisdrank", "Total_Discounted_Items": -1, "Total_Discount_Amount": -3.5, "Occurrences": 1 }]
      }
    },
    {
      "title": "Projected Top 3 Peak Sales Days (Sep 14 - Sep 27, 2024)",
      "image": images[5],
      "cat": ["Sales", "Prediction"],
      "content": "Projected top 3 peak sales days for Sep 14-27, 2024. Weekends and evening-heavy days expected to lead sales.",
      "actions": ["Staffing", "Inventory", "Training"],
      "review": {
        "Projected top 3 sales days(next 2 weeks)":
          [{ "Date": "2024-09-14", "Total_Sales": 7410.45 },
          { "Date": "2024-09-21", "Total_Sales": 7410.45 },
          { "Date": "2024-09-17", "Total_Sales": 6079.3 }]
      }
    }

  ]


  let d = master_data[2].review['Top 10 Significant Changes']
  let labels = []
  let Salesval = []
  let Avgval = []
  d.map(items => {
    Salesval.push(items['Total Sales (Last Week)'])
    Avgval.push(items['Average Sales (Previous 8 Weeks)'])
    labels.push(items['Category'])
  })


  const live_charts = [
    <Card1 key={0} data={d} />,
    <Card2 key={1} values={Object.values(master_data[1].review['Top 10 Projected Category Sales'])}
      labels={Object.keys(master_data[1].review['Top 10 Projected Category Sales'])} />,
    <Card3 key={2} lables={labels} Sales={Salesval} AverageSales={Avgval} />,
    <Card4 key={3} />,
    <Card5 key={4} />,
    <Card6 key={5} />
  ];

  const business_owner_data = [
    {
      "title": "Menu items most commonly ordered together in 2024",
      "image": bs1,
      "cat": ["Sales"],
      "content": "Menu items that are most commonly ordered together this year",
      "actions": ["Staffing", "Menu", "Marketing"],
      "top_5_revenue_items": {
        "1x Tapas onbeperkt": 82245.0,
        "Divers - 21% BTW": 19220.87,
        "Daghap hoofdgerecht": 10395.5,
        "Koffie": 6315.1,
        "Heineken 25cl": 5806.5
      },
      "bottom_5_revenue_items": {
        "Zonder bier": -3.5,
        "Broodje frikadel": -4.5,
        "Personeelskorting": -860.97,
        "Correctie": -2317.1,
        "Waardebon Inlever": -3817.9
      }
    },
    {
      "title": "Top and bottom 5 revenue generating items in last 90 days",
      "image": bs2,
      "cat": ["Sales"],
      "content": "Most and least revenue generating menu items in the last 90 days",
      "actions": ["Inventory", "Marketing"],
      "top_more_combinations": [
        // { "combination": ["Bruin brood", "Vlees", "12 uurtje"], "count": 402 },
        // { "combination": ["Appeltaart", "Met slagroom", "Koffie"], "count": 316 },
        // { "combination": ["Bruin brood", "Vis", "12 uurtje"], "count": 296 },
        // { "combination": ["Sourcy Rood", "Cappucino", "Koffie"], "count": 236 },
        // { "combination": ["Lipton ice tea", "Pepsi", "1x Tapas onbeperkt"], "count": 229 },
        // { "combination": ["Thee", "Cappucino", "Koffie"], "count": 214 },
        // { "combination": ["Pepsi", "Pepsi max", "1x Tapas onbeperkt"], "count": 206 },
        // { "combination": ["Verse thee", "Cappucino", "Koffie"], "count": 200 },
        // { "combination": ["Lipton ice tea green", "Cappucino", "Koffie"], "count": 199 },
        // { "combination": ["Bruin brood", "Vlees", "Wit brood"], "count": 198 },
        // { "combination": ["Pepsi", "Lipton ice tea green", "1x Tapas onbeperkt"], "count": 192 },
        // { "combination": ["Lipton ice tea", "Heineken 25cl", "Pepsi"], "count": 191 },
        // { "combination": ["Vlees", "12 uurtje", "Wit brood"], "count": 182 },
        // { "combination": ["Heineken 25cl", "Pepsi", "1x Tapas onbeperkt"], "count": 181 },
        // { "combination": ["Vlees", "12 uurtje", "Tomatensoep"], "count": 180 },
        // { "combination": ["Sourcy Rood", "Pepsi max", "1x Tapas onbeperkt"], "count": 180 },
        // { "combination": ["Sourcy blauw", "Heineken 25cl", "Pepsi"], "count": 177 },
        // { "combination": ["Sourcy blauw", "Pepsi", "1x Tapas onbeperkt"], "count": 174 },
        // { "combination": ["Lipton ice tea", "Lipton ice tea green", "1x Tapas onbeperkt"], "count": 173 },
        // { "combination": ["Pepsi", "1x Tapas onbeperkt", "Koffie"], "count": 170 }
        { "combination": ["Bruin brood", "Vlees", "12 uurtje"], "count": 402 },
        { "combination": ["Appeltaart", "Met slagroom", "Koffie"], "count": 316 },
        { "combination": ["Bruin brood", "Vis", "12 uurtje"], "count": 296 },
        { "combination": ["Sourcy Rood", "Cappucino", "Koffie"], "count": 236 },
        { "combination": ["Lipton ice tea", "Pepsi", "1x Tapas onbeperkt"], "count": 229 },
        { "combination": ["Thee", "Cappucino", "Koffie"], "count": 214 },
        { "combination": ["Pepsi", "Pepsi max", "1x Tapas onbeperkt"], "count": 206 },
        { "combination": ["Verse thee", "Cappucino", "Koffie"], "count": 200 },
        { "combination": ["Lipton ice tea green", "Cappucino", "Koffie"], "count": 199 }

      ]
    },
    {
      "title": "Market Share Trend - Jan to Sep 2024",
      "image": bs3,
      "cat": ["Sales"],
      "content": "Market share trending downwards this month. Consider a marketing campaign",
      "actions": ["Marketing"],
      "Market_Share_Trend": [
        {
          "YearMonth_str": "2024-01",
          "Market Share (%)": 0.014358156889495224
        },
        {
          "YearMonth_str": "2024-02",
          "Market Share (%)": 0.01683869713506139
        },
        {
          "YearMonth_str": "2024-03",
          "Market Share (%)": 0.021848959072305593
        },
        {
          "YearMonth_str": "2024-04",
          "Market Share (%)": 0.02040482537517053
        },
        {
          "YearMonth_str": "2024-05",
          "Market Share (%)": 0.021680708049113234
        },
        {
          "YearMonth_str": "2024-06",
          "Market Share (%)": 0.021604316507503413
        },
        {
          "YearMonth_str": "2024-07",
          "Market Share (%)": 0.019190765347885403
        },
        {
          "YearMonth_str": "2024-08",
          "Market Share (%)": 0.0246676002728513
        },
        {
          "YearMonth_str": "2024-09",
          "Market Share (%)": 0.0234036275579809
        }
      ]

    },
    {
      "title": "Q4 Revenue Comparison: Side-by-Side Bars per Month",
      "image": bs4,
      "cat": ["Sales", "Prediction"],
      "content": "Sales forecast for Q4 relative to 2023 sales during the same time",
      "actions": ["Inventory", "Marketing"],
      "Forecasted_Revenue_Comp": [

        {
          "Month": "2023-10",
          "Q4 2023 Actual": 143955.9,
          "Q4 2024 Projected": NaN
        },
        {
          "Month": "2023-11",
          "Q4 2023 Actual": 146325.11,
          "Q4 2024 Projected": NaN
        },
        {
          "Month": "2023-12",
          "Q4 2023 Actual": 166921.25,
          "Q4 2024 Projected": NaN
        },
        {
          "Month": "2024-10",
          "Q4 2023 Actual": NaN,
          "Q4 2024 Projected": 164343.47
        },
        {
          "Month": "2024-11",
          "Q4 2023 Actual": NaN,
          "Q4 2024 Projected": 164343.47
        },
        {
          "Month": "2024-12",
          "Q4 2023 Actual": NaN,
          "Q4 2024 Projected": 164343.47
        }

      ]

    }

  ]

  const bo_live_charts = [<BS1 key={0} />, <BS2 key={1} values={business_owner_data[0]} />, <BS3 key={2} />, <BS4 key={3} data={business_owner_data[3]} />]
  const [opData, setdata] = useState(role.role === "Business Owner" ? business_owner_data : master_data)
  const [opChats, setChats] = useState(role.role === "Business Owner" ? bo_live_charts : live_charts)



  const click_cat = (selected) => {
    const index = actCat.indexOf(selected);
    if (index < 0) {
      actCat.push(selected);
    } else {
      actCat.splice(index, 1);
    }
    setactcat([...actCat]);
  };

  const click_act = (selected) => {
    const index = actact.indexOf(selected);
    if (index < 0) {
      actact.push(selected);
    } else {
      actact.splice(index, 1);
    }
    setactact([...actact]);
  };

  useEffect(() => {
    SetcurrentIndex(-1);
    if (role.role === "Business Owner") {
      if (actCat.length === 0 && actact.length === 0) {
        setdata(business_owner_data);
        setChats(bo_live_charts)
      } else {
        var filterindex = []
        const filteredData = business_owner_data.filter((e, index) => {
          if ((e.cat.some(active => actCat.some(temp => categories[temp] === active)) || actCat.length === 0) &&
            (e.actions.some(active => actact.some(temp => actions[temp] === active)) || actact.length === 0)) {
            filterindex.push(index)
            return true
          }
          return false;
        });
        setChats(bo_live_charts.filter((e, index) => filterindex.some(main_index => main_index === index)))
        setdata(filteredData);
      }
    } else {
      if (actCat.length === 0 && actact.length === 0) {
        setdata(master_data);
        setChats(live_charts)
      } else {
        var filterindex = []
        const filteredData = master_data.filter((e, index) => {
          if ((e.cat.some(active => actCat.some(temp => categories[temp] === active)) || actCat.length === 0) && (e.actions.some(active => actact.some(temp => actions[temp] === active)) || actact.length === 0)) {
            filterindex.push(index)
            return true
          }
          return false
        });
        setChats(live_charts.filter((e, index) => filterindex.some(main_index => main_index === index)))
        setdata(filteredData);
      }
    }
  }, [actCat, actact])


  const handelBizzy = (index) => {
    SetBizzyIndex(index)
    setChatModel(previousState => !previousState)
  }

  return (
    <div className="page-content">
      <Container fluid>
        {/* <Breadcrumbs title={"I&A"} breadcrumbItem={"INSIGHTS AND ACTIONS"} /> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5 style={{ fontFamily: " 'Poppins', sans-serif", fontSize: "26px", fontWeight: "500", lineHeight: "normal", letterSpacing: "0%", textAlign: "left", color: "black" }}>Insights and Actions</h5>
          <CalendarComponent date={date} set_newdate={setdate} />
        </div>
        <Row>
          <Col className="my-3">
            <h4 className="filter-title">Categories</h4>
            <div className="button-container">
              <ButtonGroup>
                {
                  categories.map(
                    (e, index) =>
                      <Button
                        key={index}
                        color="white"
                        className={actCat.includes(index) ? "shadow-none" : "shadow-none on-hover-ia"}
                        active={actCat.includes(index)}
                        onClick={() => click_cat(index)}
                        style={actCat.includes(index) ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}

                      >
                        {e}
                      </Button>
                  )
                }
              </ButtonGroup>

            </div>
          </Col>
          <Col className="my-3">
            <h4 className="filter-title">Actions</h4>
            <div className="button-container">
              <ButtonGroup>
                {
                  actions.map(
                    (e, index) =>
                      <Button
                        key={index}
                        color="white"
                        className={actact.includes(index) ? "shadow-none" : "shadow-none on-hover-ia"}
                        active={actact.includes(index)}
                        onClick={() => click_act(index)}
                        style={actact.includes(index) ? { color: "var(--Black-shade-500, #3D505C)", border: " 1px solid var(--Black-shade-200, #D8DCDE)", backgroundColor: "var(--Base-White, #FFF)" } : { color: "var(--Black-shade-500, #3D505C)", border: "1px solid var(--Black-shade-200, #D8DCDE)" }}

                      >
                        {e}
                      </Button>
                  )
                }
              </ButtonGroup>

            </div>
          </Col>
        </Row>
        <Row>
          {/* {role.role === "Business Owner" && <p>{role.role}</p>} */}
          {opData.length === 0 ? <p>There is no card for the applied filter.</p> :
            opData.map((e, index) => {
              return (
                <Col key={index} lg={4} md={6} sm={6} className="mb-2">
                  <Card className="my-card d-flex">
                    <CardBody>
                      <div className="expand-icon">
                        <img src={exportIcon} alt="expand" style={{ backgroundColor: "var(--Black-shade-50, #F7F7F8)", border: "1px solid var(--Black-shade-200, #D8DCDE)", height: "100%", borderRadius: "8px", cursor: "pointer", padding: "6px" }} onClick={() => {
                          SetcurrentIndex(index);
                          toggle();
                        }} />
                      </div>
                      <Row xs={3} sm={3} md={2} lg={3} xl={3}>
                        <img
                          style={{ cursor: "pointer", width: 'auto', height: 'fit-content', marginBottom: '1rem', padding: "1px" }}
                          src={e.image}
                          onClick={() => {
                            SetcurrentIndex(index);
                            toggle();
                          }}
                          alt="Graph"
                        />
                        <Col className="flex-grow-1">
                          <CardTitle className="mt-0">{e.cat.join(", ")}</CardTitle>
                          <CardText>
                            <p className="card-content-text">
                              {e.content}
                            </p>
                            <div style={{ float: "inline-start" }}>
                              {e.actions.map((child, cindex) => {
                                return (
                                  <Button
                                    size="sm"
                                    key={cindex}
                                    style={{ cursor: "inherit", color: "black", backgroundColor: "white", border: `2px solid ${color[child]}` }}
                                    className={index === 0 ? " btn-rounded m-1 shadow-none" : "btn-rounded m-1 shadow-none"}
                                  >
                                    {child}
                                  </Button>
                                )
                              })}
                            </div>
                          </CardText>
                        </Col>
                      </Row>
                      <div className="miniBizzy">
                        <button style={{ backgroundColor: "transparent", border: "0px", color: "white", cursor: "pointer", padding: "0px" }} onClick={() => handelBizzy(index)}>
                          <img src={BizzyIcon} alt="BizzyIcon" />
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          }


        </Row>
        {opData.length !== 0 && currentIndex !== -1 &&
          <>
           
            <Modal isOpen={modal} toggle={ toggle} size="xl" centered scrollable>
              <ModalHeader toggle={toggle}>{opData[currentIndex] && opData[currentIndex].title}</ModalHeader>
              <ModalBody>
                {
                  opChats[currentIndex]
                }
                <div style={{ padding: "10px" }}>
                  <Row>
                    <h5>{opData[currentIndex].cat.join(", ")}</h5>

                  </Row>
                  <Row>
                    <p className="card-content-text mb-2">
                      {opData[currentIndex].content}
                    </p>
                  </Row>

                  {opData[currentIndex].actions.map((child, cindex) => {
                    return (
                      <div style={{ float: "inline-start" }} key={cindex}>
                        <Button
                          size="sm"
                          style={{ cursor: "inherit", color: "black", backgroundColor: "white", border: `2px solid ${color[child]}`, }}
                          className={cindex === 0 ? " btn-rounded m-1 shadow-none" : "btn-rounded m-1 shadow-none"}
                        >
                          {child}
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </ModalBody>
            </Modal>
          </>
        }
        {chatModel && <Modal isOpen={chatModel} toggle={chatToggle} size="xl" centered scrollable>
              <ModalHeader toggle={chatToggle}><img src={Ask} width="100" /></ModalHeader>
              <ModalBody>
                {
                  role.role === "Business Owner" ? <MiniChat/> :
                    <MiniChat content={opData[BizzyIndex].content} image={opData[BizzyIndex].image} Bindex={BizzyIndex} role={role.role}/>
                }
              </ModalBody>

            </Modal>}

      </Container>
    </div>

  );
};


export default IA;