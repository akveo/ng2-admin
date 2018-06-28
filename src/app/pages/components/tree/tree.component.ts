import { Component , OnInit} from '@angular/core';
import { ViewChild } from '@angular/core';
import { TreeComponent, TREE_ACTIONS,  ITreeOptions } from 'angular-tree-component';
import * as _ from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputComponent } from './input.component';
@Component({
  selector: 'ngx-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeAComponent implements OnInit {
  nodes = [{
    name: 'Programming languages by programming paradigm',
    children: [{
      name: 'Object-oriented programming',
      children: [{
        name: 'Java',
      }, {
        name: 'C++',
      }, {
        name: 'C#',
      }],
    }, {
      name: 'Prototype-based programming',
      children: [{
        name: 'JavaScript',
      }, {
        name: 'CoffeeScript',
      }, {
        name: 'Lua',
      }],
    }],
  }];
  options: ITreeOptions = {
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'id',
    hasChildrenField: 'children',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        },
      },
    },
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
  }
  constructor(
    private modalService: NgbModal,
  ) { }
  ngOnInit() {
  }
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  actionClick(node, tree, op) {
    switch (op) {
      case 1:
        this.openPopup(node, tree , 'Edit' , 1);
        break;
      case 2:
        this.openPopup(node, tree , 'Add Node' , 2);
        break;
      case 3:
        this.openPopup(node, tree , 'Add Catagery', 3);
        break;
      default: alert('Invalid Action');
    }
  }
  openPopup(node , tree , header , ops) {
    const activeModal = this.modalService.open(InputComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalOperation = ops;
    activeModal.componentInstance.modalNode = node;
    activeModal.componentInstance.modalTree = tree;
    activeModal.result.then(() => {
      this.tree.treeModel.update();
    }, () => {
    });
  }
  deleteNode(node, tree) {
    if (confirm('Are you sure to delete ' + node.data.name)) {
      const parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
      _.remove(parentNode.data.children, function (child) {
        return child === node.data;
      });
      tree.treeModel.update();
      if (node.parent.data.children.length === 0) {
        node.parent.data.hasChildren = false;
      }
    }
  }
}
