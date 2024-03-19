import React from 'react'
import { Divider, Card, Stack, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import cImg from "/c1.png"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';


const voterRegCard = () => {
  let cName = "Pramod";
  let cWardNo = "B80";
  let cParty = "Pammi Sangha";
  return (
    <>
      <div className='shadow w-4/5 text-xl'>
        <Stack direction={"row"} justifyContent={"space-around"} mt={5}>
          <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: "semibold" }}>User Entered Data</Typography>
          <Typography sx={{ textAlign: 'center', fontSize: 30, fontWeight: "semibold" }}>API Fetched Data</Typography>
          <Divider flexItem />
        </Stack>
        <Card sx={{ p: 3 }}>

          <Stack spacing={3} direction={"row"} className='flex flex-row'>
            <Stack spacing={2} direction="column" alignItems="flex-start" justifyContent="space-between" className='basis-2/5'>
              <Box >
                <List sx={{ width: '100%', maxWidth: 360, my: 2 }}>
                  <ListItem >
                    <ListItemText primary={`Name: ${cName}`} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={`Ward No: ${cWardNo}`} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={`Party: ${cParty}`} />
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <Stack spacing={2} direction="row" alignItems="flex-start" className='basis-2/5' >
              <Divider orientation="vertical" flexItem />
              <Box>
                <List sx={{ width: '100%', maxWidth: 360, my: 2 }}>
                  <ListItem >
                    <ListItemText primary={`Name: ${cName}`} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={`Ward No: ${cWardNo}`} />
                  </ListItem>
                  <ListItem >
                    <ListItemText primary={`Party: ${cParty}`} />
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <div className='basis-1/5 items-center flex flex-col gap-2 py-12' >
              <Button variant="contained" color="error" className='absolute top-0 right-0' sx={{ maxHeight: 50, maxWidth: 350 }}>
                <DeleteOutlineOutlinedIcon />
              </Button>
              <Button variant="contained" color="success" className='absolute top-0 right-0' sx={{ maxHeight: 50, maxWidth: 350 }}>
                <CheckIcon />
              </Button>
            </div>
          </Stack>

        </Card>

      </div>
    </>
  );
}

export default voterRegCard;