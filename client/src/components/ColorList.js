import React, { useState } from "react";
import axios from "axios";
import {axiosCall} from './axios/'
import {useParams} from 'react-router-dom'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {id} = useParams()
  const [newcolor,setnewcolor] = useState()
  const [newhex,setnewhex] = useState()


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

   axiosCall().put(`/api/colors/${colorToEdit.id}`,colorToEdit).then(res=>{
        console.log(res.data)
        updateColors(()=>{
          return colors.filter(col=>{
            if(col.id===colorToEdit.id){
              col=colorToEdit
              return true
            }else{
              return true
            }
          })
        })
    })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log(color)
   axiosCall().delete(`/api/colors/${color.id}`).then(res=>{
        console.log(res.data)
        updateColors(()=>{
          return colors.filter(col=>{
            if(col.id!==color.id){
              return true
            }
          })
        })
    })
  };


  const givenewColor = (e) =>{
e.preventDefault()

 axiosCall().post(`/api/colors`,{
  color:newcolor,
  code:{
    hex:newhex
  },
  id:colors.length+1,
 }).then(res=>{
        console.log(res.data)
        // updateColors(()=>{
        //   return colors.filter(col=>{
        //     if(col.id===colorToEdit.id){
        //       col=colorToEdit
        //       return true
        //     }else{
        //       return true
        //     }
        //   })
        // })
    })

  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color}  onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}


      <Form onSubmit={givenewColor}>
      <FormGroup row>
        <Label htmlFor="color" sm={2}>color name:</Label>
        <Col sm={10}>
          <Input type="text"
          onBlur={(e)=>{setnewcolor(e.target.value)}}
           name="color" id="color" placeholder="color" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="color" sm={2}>hex:</Label>
        <Col sm={10}>
          <Input type="color" 
          onChange={(e)=>{setnewhex(e.target.value)}}
          name="hex" id="hex" placeholder="hex " />
        </Col>
      </FormGroup>
  
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button type='submit'>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
    </div>
  );
};

export default ColorList;
