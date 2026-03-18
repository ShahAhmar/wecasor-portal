<?php

namespace App\Filament\Resources\Documents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('type')
                    ->searchable()
                    ->badge(),
                \Filament\Tables\Columns\TextColumn::make('file_path')
                    ->label('File')
                    ->formatStateUsing(fn($state) => 'Download')
                    ->url(fn($record) => asset('storage/' . $record->file_path))
                    ->openUrlInNewTab(),
                \Filament\Tables\Columns\TextColumn::make('user.name')
                    ->label('Uploaded By')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('study.title')
                    ->label('Study')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('status')
                    ->searchable()
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Active' => 'success',
                        'Archived' => 'gray',
                        default => 'primary',
                    }),
                \Filament\Tables\Columns\TextColumn::make('access_level')
                    ->badge(),
                \Filament\Tables\Columns\TextColumn::make('documentCategory.name')
                    ->label('Category')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
