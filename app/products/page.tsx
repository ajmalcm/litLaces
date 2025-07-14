"use client"
import React from 'react'
import { BrandItems } from '@/utils/temp'
import CollectionsCard from '@/components/CollectionsCard'
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
const page = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <div className='w-[100vw] bg-white py-50 md:py-10 px-4 '>
     <Box
        sx={{ flexGrow: 1, width: { xs: "100%", md: "90%", margin: "10px auto" } }}
      >
        <Grid columns={12}>
          <h2 className="md:text-4xl text-3xl font-mono font-bold  pb-4 md:pb-8 capitalize">
            Collections
          </h2>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {BrandItems.map((item, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
              <Item>
                <CollectionsCard
                  logo={item.logo}
                  link={item.link}
                  text={item.name}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default page