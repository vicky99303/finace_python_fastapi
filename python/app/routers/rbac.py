from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Role, Permission, User
from app.auth import require_permission

router = APIRouter()
@router.post("/roles", dependencies=[Depends(require_permission("manage_roles"))])

@router.post("/permissions")
def create_permission(name: str, db: Session = Depends(get_db)):
    existing = db.query(Permission).filter(Permission.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Permission exists")

    perm = Permission(name=name)
    db.add(perm)
    db.commit()
    db.refresh(perm)

    return perm

@router.post("/roles")
def create_role(name: str, db: Session = Depends(get_db)):
    existing = db.query(Role).filter(Role.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role exists")

    role = Role(name=name)
    db.add(role)
    db.commit()
    db.refresh(role)

    return role

@router.post("/roles/{role_id}/permissions/{permission_id}")
def assign_permission(role_id: int, permission_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).get(role_id)
    perm = db.query(Permission).get(permission_id)

    if not role or not perm:
        raise HTTPException(status_code=404, detail="Not found")

    role.permissions.append(perm)
    db.commit()

    return {"message": "Permission assigned"}

@router.post("/users/{user_id}/roles/{role_id}")
def assign_role(user_id: int, role_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    role = db.query(Role).get(role_id)

    if not user or not role:
        raise HTTPException(status_code=404, detail="Not found")

    user.roles.append(role)
    db.commit()

    return {"message": "Role assigned"}

@router.get("/roles")
def list_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()


@router.get("/permissions")
def list_permissions(db: Session = Depends(get_db)):
    return db.query(Permission).all()

