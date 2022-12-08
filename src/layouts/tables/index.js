/**
=========================================================
*  React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";

//  React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

//  React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { CREATE_GAME, CREATE_GAME_RESULT, LIST_TEAMS, LIST_MATCHS } from "../../modules/graphql/game"
import { useMutation, useQuery } from '@apollo/client';

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const auth = useSelector((authItem) => authItem.auth);
  const [firstTeam, setFirstTeam] = useState(null)
  const [secondTeam, setSecondTeam] = useState(null)
  const [matchId, setMatchId] = useState(null)
  const [firstTeamResult, setFirstTeamResult] = useState(null)
  const [secondTeamResult, setSecondTeamResult] = useState(null)
  const [important, setImportant] = useState(false)
  const [createGame, { loading }] = useMutation(
    CREATE_GAME,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const [createGameResult, { loadingResult }] = useMutation(
    CREATE_GAME_RESULT,
    {
      fetchPolicy: 'no-cache',
    }
  );

  const { loading: load, data: data, refetch: refetch, error: erro } = useQuery(LIST_TEAMS, {
    fetchPolicy: 'no-cache',
  });
  const { loading: loadMatch, data: dataMatch, refetch: refetchMatch, error: erroMatch } = useQuery(LIST_MATCHS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    console.log("dataMatch", dataMatch)
  }, [dataMatch])
  const game = () => {
    createGame({
      variables: {
        first_team: firstTeam,
        second_team: secondTeam,
        important: important == 'true' ? true : false
      },
    })
      .then((resp) => {
        console.log("resp", resp)
      })
      .catch(() => { });
  }
  const gameResult = () => {
    createGameResult({
      variables: {
        match_id: matchId,
        first_team: parseInt(firstTeamResult),
        second_team: parseInt(secondTeamResult),
      },
    })
      .then((resp) => {
        console.log("resp", resp)
      })
      .catch(() => { });
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid spacing={12}>
      <select onChange={(event) => {
        setFirstTeam(event.target.value)
      }}>
        {
          data?.teams?.map(item => <option value={item.id}>{item.name}</option>)
        }

      </select>
      <select onChange={(event) => {
        console.log(event.target.value)
        setSecondTeam(event.target.value)
      }}>
        {
          data?.teams?.map(item => <option value={item.id}>{item.name}</option>)
        }
      </select>
      <select onChange={(event) => {
        setImportant(event.target.value)
      }}>
        <option value={false}>Não</option>
        <option value={true}>Sim</option>
      </select>

      <MDButton
        to={"*"}
        variant="outlined"
        size="small"
        color={"red"}
        onClick={() => {
          game()
        }}
      >
        registrar jogo
      </MDButton>
      </Grid>
      <Grid spacing={12}>

      <select onChange={(event) => {
        setMatchId(event.target.value)
      }}>
        {
          dataMatch?.matchs?.map(item => <option value={item.id}>{item.first_team_description[0].name} X {item.second_team_description[0].name}</option>)
        }

      </select>

      <span>Primeiro Time</span>
      <input onChange={(event) => {
        setFirstTeamResult(event.target.value)
      }} type="text" />
      <span>Segundo Time</span>
      <input onChange={(event) => {
        setSecondTeamResult(event.target.value)
      }}type="text" />
      <MDButton
        to={"*"}
        variant="outlined"
        size="small"
        color={"red"}
        onClick={() => {
          gameResult()
        }}
      >
        registrar resultado
      </MDButton>
      </Grid>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Authors Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
